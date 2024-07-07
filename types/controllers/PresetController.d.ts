import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
export declare class PresetController {
    protected logger: ILogger;
    protected presetHelper: PresetHelper;
    protected databaseServer: DatabaseServer;
    constructor(logger: ILogger, presetHelper: PresetHelper, databaseServer: DatabaseServer);
    initialize(): void;
}
