import { DependencyContainer, inject, injectable } from "tsyringe";

import { DatabaseServer } from "@spt/servers/DatabaseServer";

import { Overrider } from "./overrides/Overrider";

@injectable()
export class Fika {
    constructor(
        @inject("DatabaseServer") protected databaseServer: DatabaseServer,
        @inject("Overrider") protected overrider: Overrider,
    ) {
        // empty
    }

    public async preSptLoad(container: DependencyContainer): Promise<void> {
        await this.overrider.override(container);
    }
}
