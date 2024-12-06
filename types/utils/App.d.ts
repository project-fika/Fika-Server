import { OnLoad } from "@spt/di/OnLoad";
import { OnUpdate } from "@spt/di/OnUpdate";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { HttpServer } from "@spt/servers/HttpServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { EncodingUtil } from "@spt/utils/EncodingUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { DatabaseService } from "@spt/services/DatabaseService";
export declare class App {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected encodingUtil: EncodingUtil;
    protected httpServer: HttpServer;
    protected databaseService: DatabaseService;
    protected onLoadComponents: OnLoad[];
    protected onUpdateComponents: OnUpdate[];
    protected onUpdateLastRun: {};
    protected coreConfig: ICoreConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, localisationService: LocalisationService, configServer: ConfigServer, encodingUtil: EncodingUtil, httpServer: HttpServer, databaseService: DatabaseService, onLoadComponents: OnLoad[], onUpdateComponents: OnUpdate[]);
    load(): Promise<void>;
    protected update(onUpdateComponents: OnUpdate[]): Promise<void>;
    protected logUpdateException(err: any, updateable: OnUpdate): void;
}
