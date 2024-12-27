import type { OnLoad } from "@spt/di/OnLoad";
import type { OnUpdate } from "@spt/di/OnUpdate";
import type { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { BackupService } from "@spt/services/BackupService";
export declare class SaveCallbacks implements OnLoad, OnUpdate {
    protected saveServer: SaveServer;
    protected configServer: ConfigServer;
    protected backupService: BackupService;
    protected coreConfig: ICoreConfig;
    constructor(saveServer: SaveServer, configServer: ConfigServer, backupService: BackupService);
    onLoad(): Promise<void>;
    getRoute(): string;
    onUpdate(secondsSinceLastRun: number): Promise<boolean>;
}
