import { DependencyContainer, inject, injectable } from "tsyringe";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { Overrider } from "./overrides/Overrider";
import { FikaServerTools } from "./utils/FikaServerTools";
import { FikaConfig } from "./utils/FikaConfig";
import { IFikaConfigNatPunchServer } from "./models/fika/config/IFikaConfigNatPunchServer";
import { FikaDedicatedProfileService } from "./services/dedicated/FikaDedicatedProfileService";
import { IFikaConfigDedicated } from "./models/fika/config/IFikaConfigDedicated";

@injectable()
export class Fika {
    protected natPunchServerConfig: IFikaConfigNatPunchServer;
    protected dedicatedConfig: IFikaConfigDedicated;

    constructor(
        @inject("DatabaseServer") protected databaseServer: DatabaseServer,
        @inject("Overrider") protected overrider: Overrider,
        @inject("FikaServerTools") protected fikaServerTools: FikaServerTools,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("FikaDedicatedProfileService") protected fikaDedicatedProfileService: FikaDedicatedProfileService,
    ) {
        this.natPunchServerConfig = fikaConfig.getConfig().natPunchServer;
        this.dedicatedConfig = fikaConfig.getConfig().dedicated;
    }

    public async preSptLoad(container: DependencyContainer): Promise<void> {
        await this.overrider.override(container);
    }

    public async postSptLoad(container: DependencyContainer): Promise<void> {
        if(this.natPunchServerConfig.enable) {
            this.fikaServerTools.startService("NatPunchServer");
        }

        if(this.dedicatedConfig.profiles.amount > 0) {
            this.fikaDedicatedProfileService.init();
        }
    }
}
