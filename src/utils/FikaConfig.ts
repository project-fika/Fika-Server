import path from "node:path";
import { inject, injectable } from "tsyringe";

import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { JsonUtil } from "@spt/utils/JsonUtil";

import { IFikaConfig } from "../models/fika/config/IFikaConfig";

import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { FileSystem } from "@spt/utils/FileSystem";
import packageJson from "../../package.json";
import { IFikaSPTServerConfig } from "../models/fika/config/IFikaConfigServer";

@injectable()
export class FikaConfig {
    protected modAuthor: string;
    protected modName: string;
    protected modPath: string;
    protected fikaConfig: IFikaConfig;
    protected defaultFikaConfig: IFikaConfig = {
        client: {
            useBtr: true,
            friendlyFire: true,
            dynamicVExfils: false,
            allowFreeCam: false,
            allowSpectateFreeCam: false,
            allowItemSending: true,
            blacklistedItems: [],
            forceSaveOnDeath: false,
            mods: {
                required: [],
                optional: [],
            },
            useInertia: true,
            sharedQuestProgression: false,
            canEditRaidSettings: true,
            enableTransits: true,
        },
        server: {
            SPT: {
                http: {
                    ip: "0.0.0.0",
                    port: 6969,
                    backendIp: "127.0.0.1", // Keep this 127.0.0.1, it's better for the client as it parses this and could potentially cause issues down the line.
                    backendPort: 6969,
                },
                disableSPTChatBots: true,
            },
            giftedItemsLoseFIR: true,
            launcherListAllProfiles: false,
            sessionTimeout: 5,
            showDevProfile: false,
            showNonStandardProfile: false,
        },
        natPunchServer: {
            enable: false,
            port: 6790,
            natIntroduceAmount: 1,
        },
        dedicated: {
            profiles: {
                amount: 0,
            },
            scripts: {
                generate: true,
                forceIp: "",
            },
        },
        background: {
            enable: true,
            easteregg: false,
        },
    };

    constructor(
        @inject("PreSptModLoader") protected preSptModLoader: PreSptModLoader,
        @inject("FileSystem") protected fileSystem: FileSystem,
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        this.modAuthor = packageJson.author.replace(/\W/g, "").toLowerCase();
        this.modName = packageJson.name.replace(/\W/g, "").toLowerCase();
        this.modPath = this.preSptModLoader.getModPath(this.getModFolderName());
    }

    public async preInit(): Promise<void> {
        const configPath = path.join(this.modPath, "assets/configs/fika.jsonc");

        if (!(await this.fileSystem.exists(path.join(configPath)))) {
            await this.fileSystem.writeJson(configPath, this.defaultFikaConfig, "\t");
        }

        this.fikaConfig = this.jsonUtil.deserializeJsonC(await this.fileSystem.read(configPath));

        if (await this.checkAndAddMissingConfigProperties(this.defaultFikaConfig, this.fikaConfig)) {
            this.fikaConfig = this.sortProperties(this.defaultFikaConfig, this.fikaConfig);
            await this.fileSystem.writeJson(configPath, this.fikaConfig, "\t");
        }

        await this.applySPTConfig(this.fikaConfig.server.SPT);
    }

    protected async checkAndAddMissingConfigProperties(source: IFikaConfig, target: IFikaConfig): Promise<boolean> {
        let modified = false;
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === "object" && !Array.isArray(source[key])) {
                    if (!target.hasOwnProperty(key)) {
                        target[key] = {};
                        modified = true;
                    }
                    const nestedModified = await this.checkAndAddMissingConfigProperties(source[key], target[key]);
                    if (nestedModified) {
                        modified = true;
                    }
                } else {
                    if (!target.hasOwnProperty(key)) {
                        target[key] = source[key];
                        modified = true;
                    }
                }
            }
        }
        return modified;
    }

    protected sortProperties(source: IFikaConfig, target: IFikaConfig): IFikaConfig {
        // Cast as IFikaConfig as this is empty before sorting.
        const sortedTarget: IFikaConfig = {} as IFikaConfig;
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === "object" && !Array.isArray(source[key])) {
                    sortedTarget[key] = this.sortProperties(source[key], target[key] || {});
                } else {
                    sortedTarget[key] = target[key];
                }
            }
        }

        return sortedTarget;
    }

    protected async applySPTConfig(config: IFikaSPTServerConfig): Promise<void> {
        this.logger.info("[Fika Server] Overriding SPT configuration");

        const coreConfig = this.configServer.getConfig(ConfigTypes.CORE) as ICoreConfig;
        const httpConfig = this.configServer.getConfig(ConfigTypes.HTTP) as IHttpConfig;

        coreConfig.features.chatbotFeatures.commandoEnabled = !config.disableSPTChatBots;
        coreConfig.features.chatbotFeatures.sptFriendEnabled = !config.disableSPTChatBots;

        httpConfig.ip = config.http.ip;
        httpConfig.port = config.http.port;
        httpConfig.backendIp = config.http.backendIp;
        httpConfig.backendPort = config.http.backendPort;
    }

    public getConfig(): IFikaConfig {
        return this.fikaConfig;
    }

    public getModFolderName(): string {
        return `${this.modAuthor}-${this.modName}`;
    }

    public getModPath(): string {
        return this.modPath;
    }

    public getVersion(): string {
        return packageJson.version;
    }
}
