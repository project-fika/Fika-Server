#!/usr/bin/env node

/**
 * Build Script
 *
 * This script automates the build process for server-side SPT mod projects, facilitating the creation of distributable
 * mod packages. It performs a series of operations as outlined below:
 * - Loads the .buildignore file, which is used to list files that should be ignored during the build process.
 * - Loads the package.json to get project details so a descriptive name can be created for the mod package.
 * - Creates a distribution directory and a temporary working directory.
 * - Copies files to the temporary directory while respecting the .buildignore rules.
 * - Creates a zip archive of the project files.
 * - Moves the zip file to the root of the distribution directory.
 * - Cleans up the temporary directory.
 *
 * It's typical that this script be customized to suit the needs of each project. For example, the script can be updated
 * to perform additional operations, such as moving the mod package to a specific location or uploading it to a server.
 * This script is intended to be a starting point for developers to build upon.
 *
 * Usage:
 * - Run this script using npm: `npm run build`
 * - Use `npm run buildinfo` for detailed logging.
 *
 * Note:
 * - Ensure that all necessary Node.js modules are installed before running the script: `npm install`
 * - The script reads configurations from the `package.json` and `.buildignore` files; ensure they are correctly set up.
 *
 * @author Refringe
 * @version v1.0.0
 */

import fs from "fs-extra";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ignore from "ignore";
import archiver from "archiver";
import winston from "winston";

// Get the command line arguments to determine whether to use verbose logging.
const args = process.argv.slice(2);
const verbose = args.includes("--verbose") || args.includes("-v");

// Configure the Winston logger to use colours.
const logColors = {
    error: "red",
    warn: "yellow",
    info: "grey",
    success: "green",
};
winston.addColors(logColors);

// Create a logger instance to log build progress. Configure the logger levels to allow for different levels of logging
// based on the verbosity flag, and set the console transport to log messages of the appropriate level.
const logger = winston.createLogger({
    levels: {
        error: 0,
        warn: 1,
        success: 2,
        info: 3,
    },
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(info => {
            return `${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            level: verbose ? "info" : "success",
        }),
    ],
});

/**
 * The main function orchestrates the build process for creating a distributable mod package. It leverages a series of
 * helper functions to perform various tasks such as loading configuration files, setting up directories, copying files
 * according to `.buildignore` rules, and creating a ZIP archive of the project files.
 *
 * Utilizes the Winston logger to provide information on the build status at different stages of the process.
 *
 * @returns {void}
 */
async function main() {
    // Get the current directory where the script is being executed
    const currentDir = getCurrentDirectory();

    // Defining at this scope because we need to use it in the finally block.
    let projectDir;

    try {
        // Load the .buildignore file to set up an ignore handler for the build process.
        const buildIgnorePatterns = await loadBuildIgnoreFile(currentDir);

        // Load the package.json file to get project details.
        const packageJson = await loadPackageJson(currentDir);

        // Create a descriptive name for the mod package.
        const projectName = createProjectName(packageJson);
        logger.log("success", `Project name created: ${projectName}`);

        // Remove the old distribution directory and create a fresh one.
        const distDir = await removeOldDistDirectory(currentDir);
        logger.log("info", "Distribution directory successfully cleaned.");

        // Create a temporary working directory to perform the build operations.
        projectDir = await createTemporaryDirectoryWithProjectName(projectName);
        logger.log("success", "Temporary working directory successfully created.");
        logger.log("info", projectDir);

        // Copy files to the temporary directory while respecting the .buildignore rules.
        logger.log("info", "Beginning copy operation using .buildignore file...");
        await copyFiles(currentDir, projectDir, buildIgnorePatterns);
        logger.log("success", "Files successfully copied to temporary directory.");

        // Create a zip archive of the project files.
        logger.log("info", "Beginning folder compression...");
        const zipFilePath = path.join(path.dirname(projectDir), `${projectName}.zip`);
        await createZipFile(projectDir, zipFilePath, "user/mods/" + projectName);
        logger.log("success", "Archive successfully created.");
        logger.log("info", zipFilePath);

        // Move the zip file inside of the project directory, within the temporary working directory.
        const zipFileInProjectDir = path.join(projectDir, `${projectName}.zip`);
        await fs.move(zipFilePath, zipFileInProjectDir);
        logger.log("success", "Archive successfully moved.");
        logger.log("info", zipFileInProjectDir);

        // Move the temporary directory into the distribution directory.
        await fs.move(projectDir, distDir);
        logger.log("success", "Temporary directory successfully moved into project distribution directory.");

        // Log the success message. Write out the path to the mod package.
        logger.log("success", "------------------------------------");
        logger.log("success", "Build script completed successfully!");
        logger.log("success", "Your mod package has been created in the 'dist' directory:");
        logger.log("success", `/${path.relative(process.cwd(), path.join(distDir, `${projectName}.zip`))}`);
        logger.log("success", "------------------------------------");
        if (!verbose) {
            logger.log("success", "To see a detailed build log, use `npm run buildinfo`.");
            logger.log("success", "------------------------------------");
        }
    } catch (err) {
        // If any of the file operations fail, log the error.
        logger.log("error", "An error occurred: " + err);
    } finally {
        // Clean up the temporary directory, even if the build fails.
        if (projectDir) {
            try {
                await fs.promises.rm(projectDir, { force: true, recursive: true });
                logger.log("info", "Cleaned temporary directory.");
            } catch (err) {
                logger.log("error", "Failed to clean temporary directory: " + err);
            }
        }
    }
}

/**
 * Retrieves the current working directory where the script is being executed. This directory is used as a reference
 * point for various file operations throughout the build process, ensuring that paths are resolved correctly regardless
 * of the location from which the script is invoked.
 *
 * @returns {string} The absolute path of the current working directory.
 */
function getCurrentDirectory() {
    return dirname(fileURLToPath(import.meta.url));
}

/**
 * Loads the `.buildignore` file and sets up an ignore handler using the `ignore` module. The `.buildignore` file
 * contains a list of patterns describing files and directories that should be ignored during the build process. The
 * ignore handler created by this method is used to filter files and directories when copying them to the temporary
 * directory, ensuring that only necessary files are included in the final mod package.
 *
 * @param {string} currentDirectory - The absolute path of the current working directory.
 * @returns {Promise<ignore>} A promise that resolves to an ignore handler.
 */
async function loadBuildIgnoreFile(currentDir) {
    const buildIgnorePath = path.join(currentDir, ".buildignore");

    try {
        // Attempt to read the contents of the .buildignore file asynchronously.
        const fileContent = await fs.promises.readFile(buildIgnorePath, "utf-8");

        // Return a new ignore instance and add the rules from the .buildignore file (split by newlines).
        return ignore().add(fileContent.split("\n"));
    } catch (err) {
        logger.log("warn", "Failed to read .buildignore file. No files or directories will be ignored.");

        // Return an empty ignore instance, ensuring the build process can continue.
        return ignore();
    }
}

/**
 * Loads the `package.json` file and returns its content as a JSON object. The `package.json` file contains important
 * project details such as the name and version, which are used in later stages of the build process to create a
 * descriptive name for the mod package. The method reads the file from the current working directory, ensuring that it
 * accurately reflects the current state of the project.
 *
 * @param {string} currentDirectory - The absolute path of the current working directory.
 * @returns {Promise<Object>} A promise that resolves to a JSON object containing the contents of the `package.json`.
 */
async function loadPackageJson(currentDir) {
    const packageJsonPath = path.join(currentDir, "package.json");

    // Read the contents of the package.json file asynchronously as a UTF-8 string.
    const packageJsonContent = await fs.promises.readFile(packageJsonPath, "utf-8");

    return JSON.parse(packageJsonContent);
}

/**
 * Constructs a descriptive name for the mod package using details from the `package.json` file. The name is created by
 * concatenating the project name, version, and a timestamp, resulting in a unique and descriptive file name for each
 * build. This name is used as the base name for the temporary working directory and the final ZIP archive, helping to
 * identify different versions of the mod package easily.
 *
 * @param {Object} packageJson - A JSON object containing the contents of the `package.json` file.
 * @returns {string} A string representing the constructed project name.
 */
function createProjectName(packageJson) {
    // Remove any non-alphanumeric characters from the author and name.
    const author = packageJson.author.replace(/\W/g, "");
    const name = packageJson.name.replace(/\W/g, "");

    // Ensure the name is lowercase, as per the package.json specification.
    return `${author}-${name}`.toLowerCase();
}

/**
 * Defines the location of the distribution directory where the final mod package will be stored and deletes any 
 * existing distribution directory to ensure a clean slate for the build process.
 *
 * @param {string} currentDirectory - The absolute path of the current working directory.
 * @returns {Promise<string>} A promise that resolves to the absolute path to the distribution directory.
 */
async function removeOldDistDirectory(projectDir) {
    const distPath = path.join(projectDir, "dist");
    await fs.remove(distPath);
    return distPath;
}

/**
 * Creates a temporary working directory using the project name. This directory serves as a staging area where project
 * files are gathered before being archived into the final mod package. The method constructs a unique directory path
 * by appending the project name to a base temporary directory path, ensuring that each build has its own isolated
 * working space. This approach facilitates clean and organized build processes, avoiding potential conflicts with other
 * builds.
 *
 * @param {string} currentDirectory - The absolute path of the current working directory.
 * @param {string} projectName - The constructed project name, used to create a unique path for the temporary directory.
 * @returns {Promise<string>} A promise that resolves to the absolute path of the newly created temporary directory.
 */
async function createTemporaryDirectoryWithProjectName(projectName) {
    // Create a new directory in the system's temporary folder to hold the project files.
    const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "spt-mod-build-"));

    // Create a subdirectory within the temporary directory using the project name for this specific build.
    const projectDir = path.join(tempDir, projectName);
    await fs.ensureDir(projectDir);

    return projectDir;
}

/**
 * Copies the project files to the temporary directory while respecting the rules defined in the `.buildignore` file.
 * The method is recursive, iterating over all files and directories in the source directory and using the ignore
 * handler to filter out files and directories that match the patterns defined in the `.buildignore` file. This ensures
 * that only the necessary files are included in the final mod package, adhering to the specifications defined by the
 * developer in the `.buildignore` file.
 *
 * The copy operations are delayed and executed in parallel to improve efficiency and reduce the build time. This is
 * achieved by creating an array of copy promises and awaiting them all at the end of the function.
 *
 * @param {string} sourceDirectory - The absolute path of the current working directory.
 * @param {string} destinationDirectory - The absolute path of the temporary directory where the files will be copied.
 * @param {Ignore} ignoreHandler - The ignore handler created from the `.buildignore` file.
 * @returns {Promise<void>} A promise that resolves when all copy operations are completed successfully.
 */
async function copyFiles(srcDir, destDir, ignoreHandler) {
    try {
        // Read the contents of the source directory to get a list of entries (files and directories).
        const entries = await fs.promises.readdir(srcDir, { withFileTypes: true });

        // Initialize an array to hold the promises returned by recursive calls to copyFiles and copyFile operations.
        const copyOperations = [];

        for (const entry of entries) {
            // Define the source and destination paths for each entry.
            const srcPath = path.join(srcDir, entry.name);
            const destPath = path.join(destDir, entry.name);

            // Get the relative path of the source file to check against the ignore handler.
            const relativePath = path.relative(process.cwd(), srcPath);

            // If the ignore handler dictates that this file should be ignored, skip to the next iteration.
            if (ignoreHandler.ignores(relativePath)) {
                logger.log("info", `Ignored: /${path.relative(process.cwd(), srcPath)}`);
                continue;
            }

            if (entry.isDirectory()) {
                // If the entry is a directory, create the corresponding temporary directory and make a recursive call
                // to copyFiles to handle copying the contents of the directory.
                await fs.ensureDir(destPath);
                copyOperations.push(copyFiles(srcPath, destPath, ignoreHandler));
            } else {
                // If the entry is a file, add a copyFile operation to the copyOperations array and log the event when
                // the operation is successful.
                copyOperations.push(
                    fs.copy(srcPath, destPath).then(() => {
                        logger.log("info", `Copied: /${path.relative(process.cwd(), srcPath)}`);
                    })
                );
            }
        }

        // Await all copy operations to ensure all files and directories are copied before exiting the function.
        await Promise.all(copyOperations);
    } catch (err) {
        // Log an error message if any error occurs during the copy process.
        logger.log("error", "Error copying files: " + err);
    }
}

/**
 * Creates a ZIP archive of the project files located in the temporary directory. The method uses the `archiver` module
 * to create a ZIP file, which includes all the files that have been copied to the temporary directory during the build
 * process. The ZIP file is named using the project name, helping to identify the contents of the archive easily.
 *
 * @param {string} directoryPath - The absolute path of the temporary directory containing the project files.
 * @param {string} projectName - The constructed project name, used to name the ZIP file.
 * @returns {Promise<string>} A promise that resolves to the absolute path of the created ZIP file.
 */
async function createZipFile(directoryToZip, zipFilePath, containerDirName) {
    return new Promise((resolve, reject) => {
        // Create a write stream to the specified ZIP file path.
        const output = fs.createWriteStream(zipFilePath);

        // Create a new archiver instance with ZIP format and maximum compression level.
        const archive = archiver("zip", {
            zlib: { level: 9 },
        });

        // Set up an event listener for the 'close' event to resolve the promise when the archiver has finalized.
        output.on("close", function () {
            logger.log("info", "Archiver has finalized. The output and the file descriptor have closed.");
            resolve();
        });

        // Set up an event listener for the 'warning' event to handle warnings appropriately, logging them or rejecting
        // the promise based on the error code.
        archive.on("warning", function (err) {
            if (err.code === "ENOENT") {
                logger.log("warn", `Archiver issued a warning: ${err.code} - ${err.message}`);
            } else {
                reject(err);
            }
        });

        // Set up an event listener for the 'error' event to reject the promise if any error occurs during archiving.
        archive.on("error", function (err) {
            reject(err);
        });

        // Pipe archive data to the file.
        archive.pipe(output);

        // Add the directory to the archive, under the provided directory name.
        archive.directory(directoryToZip, containerDirName);

        // Finalize the archive, indicating that no more files will be added and triggering the 'close' event once all
        // data has been written.
        archive.finalize();
    });
}

// Engage!
main();
