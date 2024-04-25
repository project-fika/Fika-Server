import { ISeasonalEventConfig } from "@spt-aki/models/spt/config/ISeasonalEventConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
export declare class GameEventHelper {
    protected databaseServer: DatabaseServer;
    protected configServer: ConfigServer;
    protected seasonalEventConfig: ISeasonalEventConfig;
    constructor(databaseServer: DatabaseServer, configServer: ConfigServer);
}
