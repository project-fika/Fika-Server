import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { IBackupConfig } from "@spt/models/spt/config/IBackupConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
export declare class BackupService {
    protected logger: ILogger;
    protected preSptModLoader: PreSptModLoader;
    protected configServer: ConfigServer;
    protected backupConfig: IBackupConfig;
    protected readonly activeServerMods: string[];
    protected readonly profileDir = "./user/profiles";
    constructor(logger: ILogger, preSptModLoader: PreSptModLoader, configServer: ConfigServer);
    /**
     * Initializes the backup process.
     *
     * This method orchestrates the profile backup service. Handles copying profiles to a backup directory and cleaning
     * up old backups if the number exceeds the configured maximum.
     *
     * @returns A promise that resolves when the backup process is complete.
     */
    init(): Promise<void>;
    /**
     * Fetches the names of all JSON files in the profile directory.
     *
     * This method normalizes the profile directory path and reads all files within it. It then filters the files to
     * include only those with a `.json` extension and returns their names.
     *
     * @returns A promise that resolves to an array of JSON file names.
     */
    protected fetchProfileFiles(): Promise<string[]>;
    /**
     * Check to see if the backup service is enabled via the config.
     *
     * @returns True if enabled, false otherwise.
     */
    protected isEnabled(): boolean;
    /**
     * Generates the target directory path for the backup. The directory path is constructed using the `directory` from
     * the configuration and the current backup date.
     *
     * @returns The target directory path for the backup.
     */
    protected generateBackupTargetDir(): string;
    /**
     * Generates a formatted backup date string in the format `YYYY-MM-DD_hh-mm-ss`.
     *
     * @returns The formatted backup date string.
     */
    protected generateBackupDate(): string;
    /**
     * Cleans up old backups in the backup directory.
     *
     * This method reads the backup directory, and sorts backups by modification time. If the number of backups exceeds
     * the configured maximum, it deletes the oldest backups.
     *
     * @returns A promise that resolves when the cleanup is complete.
     */
    protected cleanBackups(): Promise<void>;
    /**
     * Retrieves and sorts the backup file paths from the specified directory.
     *
     * @param dir - The directory to search for backup files.
     * @returns A promise that resolves to an array of sorted backup file paths.
     */
    private getBackupPaths;
    /**
     * Compares two backup folder names based on their extracted dates.
     *
     * @param a - The name of the first backup folder.
     * @param b - The name of the second backup folder.
     * @returns The difference in time between the two dates in milliseconds, or `null` if either date is invalid.
     */
    private compareBackupDates;
    /**
     * Extracts a date from a folder name string formatted as `YYYY-MM-DD_hh-mm-ss`.
     *
     * @param folderName - The name of the folder from which to extract the date.
     * @returns A Date object if the folder name is in the correct format, otherwise null.
     */
    private extractDateFromFolderName;
    /**
     * Removes excess backups from the backup directory.
     *
     * @param backups - An array of backup file names to be removed.
     * @returns A promise that resolves when all specified backups have been removed.
     */
    private removeExcessBackups;
    /**
     * Start the backup interval if enabled in the configuration.
     */
    protected startBackupInterval(): void;
    /**
     * Get an array of active server mod details.
     *
     * @returns An array of mod names.
     */
    protected getActiveServerMods(): string[];
}
