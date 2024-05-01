import path from "node:path";
import { DependencyContainer, inject, injectable } from "tsyringe";

import { ILocaleBase } from "@spt-aki/models/spt/server/ILocaleBase";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ImporterUtil } from "@spt-aki/utils/ImporterUtil";

import { Override } from "../../di/Override";
import { FikaConfig } from "../../utils/FikaConfig";

@injectable()
export class LocalesOverride extends Override {
    constructor(
        @inject("DatabaseServer") protected databaseServer: DatabaseServer,
        @inject("ImporterUtil") protected importerUtil: ImporterUtil,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {
        super();
    }

    public async execute(_container: DependencyContainer): Promise<void> {
        const database = this.databaseServer.getTables();
        const databasePath = path.join(this.fikaConfig.getModPath(), "assets/database/");

        const locales = await this.importerUtil.loadAsync<ILocaleBase>(path.join(databasePath, "locales/"), databasePath);
        database.locales = { ...database.locales, ...locales };
    }
}
