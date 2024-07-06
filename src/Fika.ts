import { DependencyContainer, inject, injectable } from "tsyringe";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { Overrider } from "./overrides/Overrider";
import { FikaServerTools } from "./utils/FikaServerTools";
import { FikaConfig } from "./utils/FikaConfig";
import { IFikaConfigNatPunchServer } from "./models/fika/config/IFikaConfigNatPunchServer";

@injectable()
export class Fika {
    protected natPunchServerConfig: IFikaConfigNatPunchServer;

    constructor(
        @inject("DatabaseServer") protected databaseServer: DatabaseServer,
        @inject("Overrider") protected overrider: Overrider,
        @inject("FikaServerTools") protected fikaServerTools: FikaServerTools,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {
        this.natPunchServerConfig = fikaConfig.getConfig().natPunchServer;
    }

    public async preSptLoad(container: DependencyContainer): Promise<void> {
        await this.overrider.override(container);
    }

    public async postSptLoad(container: DependencyContainer): Promise<void> {
        if(this.natPunchServerConfig.enable) {
            this.fikaServerTools.startService("NatPunchServer");
        }
    }
}
