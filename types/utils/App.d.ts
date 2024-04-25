import { OnLoad } from "@spt-aki/di/OnLoad";
import { OnUpdate } from "@spt-aki/di/OnUpdate";
import { ICoreConfig } from "@spt-aki/models/spt/config/ICoreConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { EncodingUtil } from "@spt-aki/utils/EncodingUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class App {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected encodingUtil: EncodingUtil;
    protected onLoadComponents: OnLoad[];
    protected onUpdateComponents: OnUpdate[];
    protected onUpdateLastRun: {};
    protected coreConfig: ICoreConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, localisationService: LocalisationService, configServer: ConfigServer, encodingUtil: EncodingUtil, onLoadComponents: OnLoad[], onUpdateComponents: OnUpdate[]);
    load(): Promise<void>;
    protected update(onUpdateComponents: OnUpdate[]): Promise<void>;
    protected logUpdateException(err: any, updateable: OnUpdate): void;
}
