import { DependencyContainer, inject, injectable } from "tsyringe";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { Overrider } from "./overrides/Overrider";
import { FikaNatPunchRelayService } from "./services/FikaNatPunchRelayService";

@injectable()
export class Fika {
    constructor(
        @inject("DatabaseServer") protected databaseServer: DatabaseServer,
        @inject("Overrider") protected overrider: Overrider,
        @inject("FikaNatPunchRelayService") protected fikaNatPunchRelayService: FikaNatPunchRelayService,
    ) {
        // empty
    }

    public async preSptLoad(container: DependencyContainer): Promise<void> {
        await this.overrider.override(container);
    }

    public async postSptLoad(container: DependencyContainer): Promise<void> {
        // unused
    }
}
