import type { OnLoad } from "@spt/di/OnLoad";
import type { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import type { ImageRouter } from "@spt/routers/ImageRouter";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { EncodingUtil } from "@spt/utils/EncodingUtil";
import { HashUtil } from "@spt/utils/HashUtil";
import type { ImporterUtil } from "@spt/utils/ImporterUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { VFS } from "@spt/utils/VFS";
export declare class DatabaseImporter implements OnLoad {
    protected logger: ILogger;
    protected vfs: VFS;
    protected jsonUtil: JsonUtil;
    protected localisationService: LocalisationService;
    protected databaseServer: DatabaseServer;
    protected imageRouter: ImageRouter;
    protected encodingUtil: EncodingUtil;
    protected hashUtil: HashUtil;
    protected importerUtil: ImporterUtil;
    protected configServer: ConfigServer;
    private hashedFile;
    private valid;
    private filepath;
    protected httpConfig: IHttpConfig;
    constructor(logger: ILogger, vfs: VFS, jsonUtil: JsonUtil, localisationService: LocalisationService, databaseServer: DatabaseServer, imageRouter: ImageRouter, encodingUtil: EncodingUtil, hashUtil: HashUtil, importerUtil: ImporterUtil, configServer: ConfigServer);
    /**
     * Get path to spt data
     * @returns path to data
     */
    getSptDataPath(): string;
    onLoad(): Promise<void>;
    protected hydrateDatabase(filepath: string): Promise<void>;
    protected onReadValidate(fileWithPath: string, data: string): void;
    /**
     * Normalize key paths to ensure consistency in how they were generated. Validation keys are are relative paths
     * from the `assets` directory, normalized, no leading slash, forward slashes, and include the file extension.
     * Example: `database/locations/sandbox/base.json`
     *
     * @param keyPath - The path that is being used for a validation check that needs to be normalized.
     */
    protected normalizeKeyPath(keyPath: string): string;
    protected validateFile(filePathAndName: string, fileData: any): boolean;
    loadImages(filepath: string, directories: string[], routes: string[]): void;
    protected getImagePathOverride(imagePath: string): string;
}
