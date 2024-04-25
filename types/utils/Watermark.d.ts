import { ICoreConfig } from "@spt-aki/models/spt/config/ICoreConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
export declare class WatermarkLocale {
    protected localisationService: LocalisationService;
    protected description: string[];
    protected warning: string[];
    protected modding: string[];
    constructor(localisationService: LocalisationService);
    getDescription(): string[];
    getWarning(): string[];
    getModding(): string[];
}
export declare class Watermark {
    protected logger: ILogger;
    protected configServer: ConfigServer;
    protected localisationService: LocalisationService;
    protected watermarkLocale?: WatermarkLocale;
    protected akiConfig: ICoreConfig;
    protected text: string[];
    protected versionLabel: string;
    constructor(logger: ILogger, configServer: ConfigServer, localisationService: LocalisationService, watermarkLocale?: WatermarkLocale);
    initialize(): void;
    /**
     * Get a version string (x.x.x) or (x.x.x-BLEEDINGEDGE) OR (X.X.X (18xxx))
     * @param withEftVersion Include the eft version this spt version was made for
     * @returns string
     */
    getVersionTag(withEftVersion?: boolean): string;
    /**
     * Handle singleplayer/settings/version
     * Get text shown in game on screen, can't be translated as it breaks bsgs client when certian characters are used
     * @returns string
     */
    getInGameVersionLabel(): string;
    /** Set window title */
    protected setTitle(): void;
    /** Reset console cursor to top */
    protected resetCursor(): void;
    /** Draw the watermark */
    protected draw(): void;
}
