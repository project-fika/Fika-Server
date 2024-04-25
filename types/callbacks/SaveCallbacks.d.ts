import { OnLoad } from "@spt-aki/di/OnLoad";
import { OnUpdate } from "@spt-aki/di/OnUpdate";
import { ICoreConfig } from "@spt-aki/models/spt/config/ICoreConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
export declare class SaveCallbacks implements OnLoad, OnUpdate {
    protected saveServer: SaveServer;
    protected configServer: ConfigServer;
    protected coreConfig: ICoreConfig;
    constructor(saveServer: SaveServer, configServer: ConfigServer);
    onLoad(): Promise<void>;
    getRoute(): string;
    onUpdate(secondsSinceLastRun: number): Promise<boolean>;
}
