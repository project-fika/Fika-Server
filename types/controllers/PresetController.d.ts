import { PresetHelper } from "@spt-aki/helpers/PresetHelper";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
export declare class PresetController {
    protected logger: ILogger;
    protected presetHelper: PresetHelper;
    protected databaseServer: DatabaseServer;
    constructor(logger: ILogger, presetHelper: PresetHelper, databaseServer: DatabaseServer);
    initialize(): void;
}
