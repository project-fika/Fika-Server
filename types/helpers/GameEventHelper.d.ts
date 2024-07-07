import { ISeasonalEventConfig } from "@spt/models/spt/config/ISeasonalEventConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
export declare class GameEventHelper {
    protected databaseServer: DatabaseServer;
    protected configServer: ConfigServer;
    protected seasonalEventConfig: ISeasonalEventConfig;
    constructor(databaseServer: DatabaseServer, configServer: ConfigServer);
}
