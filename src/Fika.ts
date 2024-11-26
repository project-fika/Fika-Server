import path from "node:path";
import { DependencyContainer, inject, injectable } from "tsyringe";

import { ILocaleBase } from "@spt/models/spt/server/ILocaleBase";
import { ImageRouter } from "@spt/routers/ImageRouter";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ImporterUtil } from "@spt/utils/ImporterUtil";

import { IFikaConfigBackground } from "./models/fika/config/IFikaConfigBackground";
import { IFikaConfigDedicated } from "./models/fika/config/IFikaConfigDedicated";
import { IFikaConfigNatPunchServer } from "./models/fika/config/IFikaConfigNatPunchServer";
import { Overrider } from "./overrides/Overrider";
import { FikaPlayerRelationsCacheService } from "./services/cache/FikaPlayerRelationsCacheService";
import { FikaDedicatedProfileService } from "./services/dedicated/FikaDedicatedProfileService";
import { FikaConfig } from "./utils/FikaConfig";
import { FikaServerTools } from "./utils/FikaServerTools";

@injectable()
export class Fika {
    protected modPath: string;
    protected natPunchServerConfig: IFikaConfigNatPunchServer;
    protected dedicatedConfig: IFikaConfigDedicated;
    protected backgroundConfig: IFikaConfigBackground;

    constructor(
        @inject("DatabaseServer") protected databaseServer: DatabaseServer,
        @inject("Overrider") protected overrider: Overrider,
        @inject("FikaServerTools") protected fikaServerTools: FikaServerTools,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("FikaDedicatedProfileService") protected fikaDedicatedProfileService: FikaDedicatedProfileService,
        @inject("ImageRouter") protected imageRouter: ImageRouter,
        @inject("ImporterUtil") protected importerUtil: ImporterUtil,
        @inject("FikaPlayerRelationsCacheService") protected fikaPlayerRelationCacheServce: FikaPlayerRelationsCacheService
    ) {
        this.modPath = fikaConfig.getModPath();
        this.natPunchServerConfig = fikaConfig.getConfig().natPunchServer;
        this.dedicatedConfig = fikaConfig.getConfig().dedicated;
        this.backgroundConfig = fikaConfig.getConfig().background;
    }

    public async preSptLoad(container: DependencyContainer): Promise<void> {
        await this.overrider.override(container);
    }

    public async postSptLoad(_container: DependencyContainer): Promise<void> {
        if (this.natPunchServerConfig.enable) {
            this.fikaServerTools.startService("NatPunchServer");
        }

        if (this.dedicatedConfig.profiles.amount > 0) {
            this.fikaDedicatedProfileService.init();
        }

        this.addFikaClientLocales();
        this.fikaPlayerRelationCacheServce.postInit();

        if (this.backgroundConfig.enable) {
            const image = this.backgroundConfig.easteregg ? "assets/images/launcher/bg-senko.png" : "assets/images/launcher/bg.png";
            this.imageRouter.addRoute("/files/launcher/bg", path.join(this.modPath, image));
        }
    }

    private async addFikaClientLocales() {
        const database = this.databaseServer.getTables();
        const databasePath = path.join(this.fikaConfig.getModPath(), "assets/database/");

        const locales = await this.importerUtil.loadAsync<ILocaleBase>(path.join(databasePath, "locales/"), databasePath);

        for (const folderName in locales) {
            if (folderName === "global") {
                for (const localeKey in locales.global) {
                    const localeData = locales.global[localeKey];
                    database.locales.global[localeKey] = { ...database.locales.global[localeKey], ...localeData };
                }
            }
        }
    }
}
