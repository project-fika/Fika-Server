import { OnLoad } from "@spt-aki/di/OnLoad";
import { IHttpConfig } from "@spt-aki/models/spt/config/IHttpConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { EncodingUtil } from "@spt-aki/utils/EncodingUtil";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { ImporterUtil } from "@spt-aki/utils/ImporterUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS";
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
     * Get path to aki data
     * @returns path to data
     */
    getSptDataPath(): string;
    onLoad(): Promise<void>;
    /**
     * Read all json files in database folder and map into a json object
     * @param filepath path to database folder
     */
    protected hydrateDatabase(filepath: string): Promise<void>;
    protected onReadValidate(fileWithPath: string, data: string): void;
    getRoute(): string;
    protected validateFile(filePathAndName: string, fileData: any): boolean;
    /**
     * Find and map files with image router inside a designated path
     * @param filepath Path to find files in
     */
    loadImages(filepath: string, directories: string[], routes: string[]): void;
    /**
     * Check for a path override in the http json config file
     * @param imagePath Key
     * @returns override for key
     */
    protected getImagePathOverride(imagePath: string): string;
}
