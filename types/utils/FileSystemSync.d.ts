import type { Data, Path } from "node_modules/atomically/dist/types";
/**
 * This class handles file system operations, using `fs-extra` for most tasks except where the `atomically` package can
 * be used to improve reads and writes. The goal is to ensure that file operations are as safe as possible while still
 * providing a comfortable API.
 *
 * In this class, atomicity is focused on single files, as there's no trivial way to ensure atomicity for directories.
 *
 * This class' API matches that of the FileSystem class, but with sync methods. If you can, use the async version.
 */
export declare class FileSystemSync {
    /**
     * Copy a file or directory. The directory can have contents.
     *
     * This is file-atomic, but not directory-atomic. If the process crashes mid-operation, you may end up with some
     * files copied and some not, but never a partial file. The copy runs to completion before returning.
     *
     * @param src The source file or directory.
     * @param dest The destination file or directory.
     * @param extensionsWhitelist An optional array of file extensions to copy. If empty, all files are copied.
     * @returns void
     */
    copy(src: string, dest: string, extensionsWhitelist?: string[]): void;
    /**
     * Atomically copy a file. If the destination file exists, it will be overwritten.
     *
     * This is atomic. If the process crashes mid-write, you'll never end up with a partial file.
     *
     * @param src The source file path.
     * @param dest The destination file path.
     * @param extensionsWhitelist An optional array of file extensions to copy. If empty, all files are copied.
     * @returns void
     */
    private copyFile;
    /**
     * Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory
     * does not exist, it is created. The directory itself is not deleted.
     *
     * This is not atomic. If the process crashes mid-operation, you may end up with a partially empty directory.
     *
     * @param dirPath The directory to empty.
     * @returns void
     */
    emptyDir(dirPath: string): void;
    /**
     * Ensures that the directory exists. If the directory structure does not exist, it is created.
     *
     * @param dirPath The directory to ensure exists.
     * @returns void
     */
    ensureDir(dirPath: string): void;
    /**
     * Ensures that the file exists. If the file that is requested to be created is in directories that do not exist,
     * these directories are created. If the file already exists, it is NOT MODIFIED.
     *
     * @param file The file path to ensure exists.
     * @returns void
     */
    ensureFile(file: string): void;
    /**
     * Moves a file or directory, even across devices. Overwrites by default.
     *
     * Note: When `src` is a file, `dest` must be a file and when `src` is a directory, `dest` must be a directory.
     *
     * This is atomic for same-device single file operations, but not as a whole opteration.
     *
     * @param src The source file path or directory.
     * @param dest The destination file path or directory.
     * @param overwriteDest Whether to overwrite the destination if it already exists.
     * @returns void
     */
    move(src: string, dest: string, overwriteDest?: boolean): void;
    /**
     * Change the name or location of a file or directory.
     *
     * This is atomic for same-device single file operations, but not as a whole opteration.
     *
     * @param currentPath The current file or directory path.
     * @param newPath The new file or directory path.
     * @returns void
     */
    rename(currentPath: string, newPath: string): void;
    /**
     * Reads a file and returns the contents as a string.
     *
     * @param file The file path to read.
     * @returns The file contents as a string.
     */
    read(file: string): string;
    /**
     * Reads a file as raw data and returns the contents as a Buffer.
     *
     * @param file The file path to read.
     * @returns The raw file contents as a Buffer.
     */
    readRaw(file: string): Buffer;
    /**
     * Writes data to a file, overwriting if the file already exists. If the parent directory does not exist, it's
     * created. File must be a file path (a buffer or a file descriptor is not allowed).
     *
     * This is atomic. If the process crashes mid-write, you'll never end up with a partial file.
     *
     * @param file The file path to write to.
     * @param data The data to write to the file.
     * @returns void
     */
    write(file: string, data: Data): void;
    /**
     * Writes an object to a JSON file, overwriting if the file already exists. If the parent directory does not exist,
     * it's created. File must be a file path (a buffer or a file descriptor is not allowed).
     *
     * This is atomic. If the process crashes mid-write, you'll never end up with a partial file.
     *
     * @param file The file path to write to.
     * @param jsonObject The object to write to the file.
     * @param spacing The number of spaces or string used for spacing of the JSON file.
     * @returns void
     */
    writeJson(file: string, jsonObject: object, spacing?: string | number): void;
    /**
     * Appends a string to the bottom of a file. If the file does not exist, it is created.
     *
     * This is atomic. If the process crashes mid-write, you'll never end up with a partial file.
     *
     * @param file The file path to append to.
     * @param data The string to append to the file.
     * @returns void
     */
    append(file: string, data: string): void;
    /**
     * Test whether the given path exists.
     *
     * @param fileOrDirPath The path to test.
     * @returns True if the path exists, false otherwise.
     */
    exists(fileOrDirPath: string): boolean;
    /**
     * Reads a JSON file and then parses it into an object.
     *
     * @param file The file path to read.
     * @returns The object parsed from the JSON file.
     */
    readJson(file: Path): any;
    /**
     * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing.
     *
     * This is file-atomic, but not directory-atomic. If the process crashes mid-operation, you may end up with some
     * files removed and some not, but not a partial file.
     *
     * @param dir The file path or directory to remove.
     * @returns void
     */
    remove(dir: string): void;
    /**
     * Get the extension of a file without the dot in lowercase.
     *
     * @param filepath The file path to get the extension of.
     * @returns The file extension without the dot in lowercase.
     */
    static getFileExtension(filepath: string): string;
    /**
     * Get the filename without its extension.
     *
     * @param filepath The file path to get the filename of.
     * @returns The filename without its extension.
     */
    static stripExtension(filepath: string): string;
    /**
     * Get the file name without its extension from a file path.
     *
     * @param filepath The file path to get the file name from.
     * @returns The file name without its extension.
     */
    static getFileName(filepath: string): string;
    /**
     * Minify a JSON file by reading, parsing, and then stringifying it with no indentation.
     *
     * This is atomic. If the process crashes mid-write, you'll never end up with a partial file.
     *
     * @param filePath The file path to minify.
     * @returns void
     */
    minifyJson(filePath: string): void;
    /**
     * Minify all JSON files in a directory by recursively finding all JSON files and minifying them.
     *
     * This is atomic for single files, but not as a whole opteration. You'll never end up with a partial file, but you
     * may end up with a partial directory if the process crashes mid-minify.
     *
     * @param dir The directory to minify JSON files in.
     * @returns void
     */
    minifyJsonInDir(dir: string): void;
    /**
     * Get all files in a directory, optionally filtering by file type.
     *
     * Will always return paths with forward slashes.
     *
     * @param directory The directory to get files from.
     * @param searchRecursive Whether to search recursively.
     * @param fileTypes An optional array of file extensions to filter by (without the dot).
     * @param includeInputDir If true, the returned paths will include the directory parameter path. If false, the paths
     *                        will begin from within the directory parameter path. Default false.
     * @returns An array of file paths.
     */
    getFiles(directory: string, searchRecursive?: boolean, fileTypes?: string[], includeInputDir?: boolean): string[];
    /**
     * Get all directories in a directory.
     *
     * Will always return paths with forward slashes.
     *
     * @param directory The directory to get directories from.
     * @param searchRecursive Whether to search recursively. Default false.
     * @param includeInputDir If true, the returned paths will include the directory parameter path. If false, the paths
     *                        will begin from within the directory parameter path. Default false.
     * @returns An array of directory paths.
     */
    getDirectories(directory: string, searchRecursive?: boolean, includeInputDir?: boolean): string[];
}
