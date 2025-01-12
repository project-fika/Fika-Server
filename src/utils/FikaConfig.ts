import path from "node:path";
import { inject, injectable } from "tsyringe";

import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { JsonUtil } from "@spt/utils/JsonUtil";

import { IFikaConfig } from "../models/fika/config/IFikaConfig";

import { FileSystem } from "@spt/utils/FileSystem";
import packageJson from "../../package.json";

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
            giftedItemsLoseFIR: true,
            launcherListAllProfiles: false,
            sessionTimeout: 5,
            showDevProfile: false,
            showNonStandardProfile: false,
            disableSPTChatBots: true,
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
