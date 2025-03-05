import path from "node:path";
import { DependencyContainer, inject, injectable } from "tsyringe";

import { ILocaleBase } from "@spt/models/spt/server/ILocaleBase";
import { ImageRouter } from "@spt/routers/ImageRouter";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ImporterUtil } from "@spt/utils/ImporterUtil";

import { watch } from "node:fs";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { FileSystem } from "@spt/utils/FileSystem";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { IFikaConfig } from "./models/fika/config/IFikaConfig";
import { IFikaConfigBackground } from "./models/fika/config/IFikaConfigBackground";
import { IFikaConfigHeadless } from "./models/fika/config/IFikaConfigHeadless";
import { IFikaConfigNatPunchServer } from "./models/fika/config/IFikaConfigNatPunchServer";
import { Overrider } from "./overrides/Overrider";
import { FikaClientService } from "./services/FikaClientService";
import { FikaPlayerRelationsCacheService } from "./services/cache/FikaPlayerRelationsCacheService";
import { FikaHeadlessProfileService } from "./services/headless/FikaHeadlessProfileService";
import { FikaConfig } from "./utils/FikaConfig";
import { FikaServerTools } from "./utils/FikaServerTools";

@injectable()
export class Fika {
    protected modPath: string;
    protected natPunchServerConfig: IFikaConfigNatPunchServer;
    protected headlessConfig: IFikaConfigHeadless;
    protected backgroundConfig: IFikaConfigBackground;

    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("DatabaseServer") protected databaseServer: DatabaseServer,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("Overrider") protected overrider: Overrider,
        @inject("FikaServerTools") protected fikaServerTools: FikaServerTools,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("FikaClientService") protected fikaClientService: FikaClientService,
        @inject("FikaHeadlessProfileService") protected fikaHeadlessProfileService: FikaHeadlessProfileService,
        @inject("ImageRouter") protected imageRouter: ImageRouter,
        @inject("ImporterUtil") protected importerUtil: ImporterUtil,
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
        @inject("FileSystem") protected fileSystem: FileSystem,
        @inject("FikaPlayerRelationsCacheService") protected fikaPlayerRelationCacheServce: FikaPlayerRelationsCacheService,
    ) {
        this.modPath = fikaConfig.getModPath();
    }

    public async preSptLoad(container: DependencyContainer): Promise<void> {
        await this.fikaConfig.preInit();

        this.natPunchServerConfig = this.fikaConfig.getConfig().natPunchServer;
        this.headlessConfig = this.fikaConfig.getConfig().headless;
        this.backgroundConfig = this.fikaConfig.getConfig().background;

        await this.fikaClientService.preInit();
        await this.overrider.override(container);
    }

    public async postSptLoad(_container: DependencyContainer): Promise<void> {
        if (this.natPunchServerConfig.enable) {
            this.fikaServerTools.startService("NatPunchServer");
        }

        if (this.headlessConfig.profiles.amount > 0) {
            await this.fikaHeadlessProfileService.init();
        }

        await this.addFikaClientLocales();
        this.blacklistSpecialProfiles();
        this.fikaPlayerRelationCacheServce.postInit();

        if (this.backgroundConfig.enable) {
            const image = this.backgroundConfig.easteregg ? "assets/images/launcher/bg-senko.png" : "assets/images/launcher/bg.png";
            this.imageRouter.addRoute("/files/launcher/bg", path.join(this.modPath, image));
        }

        this.watchFikaConfig();
    }

    private async addFikaClientLocales() {
        const database = this.databaseServer.getTables();
        const databasePath = path.join(this.fikaConfig.getModPath(), "assets/database/").replace(/\\/g, "/");

        const locales = await this.importerUtil.loadAsync<ILocaleBase>(`${databasePath}locales/`, databasePath);

        for (const folderName in locales) {
            if (folderName === "global") {
                for (const localeKey in locales.global) {
                    const localeData = locales.global[localeKey];
                    database.locales.global[localeKey] = { ...database.locales.global[localeKey], ...localeData };
                }
            }
        }
    }

    private async blacklistSpecialProfiles() {
        const coreConfig: ICoreConfig = this.configServer.getConfig(ConfigTypes.CORE);
        const profileBlacklist = coreConfig.features.createNewProfileTypesBlacklist;

        if (!this.fikaConfig.getConfig().server.showDevProfile) {
            profileBlacklist.push("SPT Developer");
        }

        if (!this.fikaConfig.getConfig().server.showNonStandardProfile) {
            for (const id of ["Tournament", "SPT Easy start", "SPT Zero to hero"]) {
                profileBlacklist.push(id);
            }
        }
    }

    private watchFikaConfig(): void {
        const configPath = path.join(this.modPath, "assets/configs/fika.jsonc");
        let fileChangeTimeout = null;

        // At the moment this doesn't reload:
        // Nat punch server (Requires additional setup)
        // SPT Http configuration (Can't be changed once initialized)
        // Backgrounds on the launcher (cached?)
        // Any client options if a client is already in-game, client will have to restart his game.
        watch(configPath, async (eventType, _filename) => {
            if (eventType === "change") {
                if (fileChangeTimeout) {
                    clearTimeout(fileChangeTimeout);
                }

                // Timeout is required here, sometimes Windows will send three events if a file has changed.
                fileChangeTimeout = setTimeout(async () => {
                    let config = this.jsonUtil.deserializeJsonC<IFikaConfig>(await this.fileSystem.read(configPath));

                    if (!config) {
                        this.logger.error("[Fika Server] could not hot-reload configuration, is the syntax correct?");
                        return;
                    }

                    const oldHeadlessAmount = this.fikaConfig.getConfig().headless.profiles.amount;

                    if (this.fikaConfig.updateFikaConfig(config)) {
                        // Re-initialize new headless profiles if the number changed.
                        if (this.fikaConfig.getConfig().headless.profiles.amount > oldHeadlessAmount) {
                            await this.fikaHeadlessProfileService.init();
                        }

                        // Re-initialize required & optional mods
                        await this.fikaClientService.preInit();

                        // Re-initialize background
                        if (this.backgroundConfig.enable) {
                            const image = this.backgroundConfig.easteregg ? "assets/images/launcher/bg-senko.png" : "assets/images/launcher/bg.png";
                            this.imageRouter.addRoute("/files/launcher/bg", path.join(this.modPath, image));
                        }

                        // Re-initialize profile preset blacklist
                        const coreConfig: ICoreConfig = this.configServer.getConfig(ConfigTypes.CORE);

                        // Re-initialize showing of dev profile
                        if (this.fikaConfig.getConfig().server.showDevProfile) {
                            // Remove the blacklisted developer template
                            coreConfig.features.createNewProfileTypesBlacklist = coreConfig.features.createNewProfileTypesBlacklist.filter((item) => item !== "SPT Developer");
                        } else {
                            // Re-add the blacklisted developer template
                            if (!coreConfig.features.createNewProfileTypesBlacklist.includes("SPT Developer")) {
                                coreConfig.features.createNewProfileTypesBlacklist.push("SPT Developer");
                            }
                        }

                        if (this.fikaConfig.getConfig().server.showNonStandardProfile) {
                            for (const id of ["Tournament", "SPT Easy start", "SPT Zero to hero"]) {
                                // Remove each blacklisted template
                                coreConfig.features.createNewProfileTypesBlacklist = coreConfig.features.createNewProfileTypesBlacklist.filter((item) => item !== id);
                            }
                        } else {
                            for (const id of ["Tournament", "SPT Easy start", "SPT Zero to hero"]) {
                                // Re-add the blacklisted templates
                                if (!coreConfig.features.createNewProfileTypesBlacklist.includes(id)) {
                                    coreConfig.features.createNewProfileTypesBlacklist.push(id);
                                }
                            }
                        }

                        this.logger.info("[Fika Server] Configuration hot-reloaded successfully");
                    }
                }, 750);
            }
        });
    }
}
