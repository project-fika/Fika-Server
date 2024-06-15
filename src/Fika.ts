import { DependencyContainer, inject, injectable } from "tsyringe";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { Overrider } from "./overrides/Overrider";
import { FikaNatPunchRelayService } from "./services/FikaNatPunchRelayService";
import { FikaConfig } from "./utils/FikaConfig";

@injectable()
export class Fika {
    constructor(
        @inject("DatabaseServer") protected databaseServer: DatabaseServer,
        @inject("Overrider") protected overrider: Overrider,
        @inject("FikaNatPunchRelayService") protected fikaNatPunchRelayService: FikaNatPunchRelayService,
        @inject("FikaConfig") protected fikaConfigServer: FikaConfig,
    ) {
        // empty
    }

    public async preSptLoad(container: DependencyContainer): Promise<void> {
        await this.overrider.override(container);
    }

    public async postSptLoad(container: DependencyContainer): Promise<void> {
        const fikaConfig = this.fikaConfigServer.getConfig();

        if(fikaConfig.server.natPunchRelayService) {
            this.fikaNatPunchRelayService.start();
        }
    }
}
