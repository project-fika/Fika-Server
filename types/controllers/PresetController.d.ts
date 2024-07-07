import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
export declare class PresetController {
    protected logger: ILogger;
    protected presetHelper: PresetHelper;
    protected databaseService: DatabaseService;
    constructor(logger: ILogger, presetHelper: PresetHelper, databaseService: DatabaseService);
    initialize(): void;
}
