import path from "path";

import { ProfileController } from "@spt/controllers/ProfileController";
import { IProfileCreateRequestData } from "@spt/models/eft/profile/IProfileCreateRequestData";
import { ISptProfile, Info } from "@spt/models/eft/profile/ISptProfile";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { FileSystem } from "@spt/utils/FileSystem";
import { HashUtil } from "@spt/utils/HashUtil";

import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { inject, injectable } from "tsyringe";
import { FikaConfig } from "../../utils/FikaConfig";

@injectable()
export class FikaHeadlessProfileService {
    readonly scriptsPath = path.join(__dirname, "../../../assets/scripts");
    readonly HEAD_USEC_4 = "5fdb4139e4ed5b5ea251e4ed"; // _parent: 5cc085e214c02e000c6bea67
    readonly VOICE_USEC_4 = "6284d6a28e4092597733b7a6"; // _parent: 5fc100cf95572123ae738483

    protected httpConfig: IHttpConfig;
    private headlessProfiles: ISptProfile[] = [];

    constructor(
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("ProfileController") protected profileController: ProfileController,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("InventoryHelper") protected inventoryHelper: InventoryHelper,
        @inject("FileSystem") protected fileSystem: FileSystem,
    ) {
        this.httpConfig = this.configServer.getConfig(ConfigTypes.HTTP);
    }

    public getHeadlessProfiles(): ISptProfile[] {
        return this.headlessProfiles;
    }

    public async init(): Promise<void> {
        const headlessConfig = this.fikaConfig.getConfig().headless;

        this.headlessProfiles = this.loadHeadlessProfiles();

        this.logger.info(`Found ${this.headlessProfiles.length} headless client profiles.`);

        const profileAmount = headlessConfig.profiles.amount;

        if (this.headlessProfiles.length < profileAmount) {
            const createdProfiles = await this.createHeadlessProfiles(profileAmount);

            this.logger.success(`Created ${createdProfiles.length} headless client profiles!`);

            if (headlessConfig.scripts.generate) {
                let ip = this.httpConfig.ip;
                const port = this.httpConfig.port;

                const forceIp = headlessConfig.scripts.forceIp;

                if (forceIp != "") {
                    ip = forceIp;
                }

                if (ip == "0.0.0.0") {
                    ip = "127.0.0.1";
                }

                const backendUrl = `https://${ip}:${port}`;

                for (const profile of createdProfiles) {
                    await this.generateLaunchScript(profile.info.id, backendUrl, this.scriptsPath);
                }
            }
        }
    }

    private loadHeadlessProfiles(): ISptProfile[] {
        let profiles: ISptProfile[] = [];

        for (const profileId in this.saveServer.getProfiles()) {
            const profile = this.saveServer.getProfile(profileId);

            if (profile.info.password === "fika-headless") {
                profiles.push(profile);
            }
        }

        return profiles;
    }

    public async createHeadlessProfiles(profileAmount: number): Promise<ISptProfile[]> {
        let profileCount = this.headlessProfiles.length;
        let profileAmountToCreate = profileAmount - profileCount;
        let createdProfiles: ISptProfile[] = [];

        for (let i = 0; i < profileAmountToCreate; i++) {
            const profile = await this.createHeadlessProfile();
            createdProfiles.push(profile);
            this.headlessProfiles.push(profile);
        }

        return createdProfiles;
    }

    private async createHeadlessProfile(): Promise<ISptProfile> {
        // Generate a unique username
        const username = `headless_${this.hashUtil.generate()}`;
        // Using a password allows us to know which profiles are headless client profiles.
        const password = "fika-headless";
        // Random edition. Doesn't matter
        const edition = "Standard";

        // Create mini profile
        const profileId = await this.createMiniProfile(username, password, edition);

        // Random character configs. Doesn't matter.
        const newProfileData: IProfileCreateRequestData = {
            side: "usec",
            nickname: username, // Use the username as the nickname to ensure it is unique.
            headId: this.HEAD_USEC_4,
            voiceId: this.VOICE_USEC_4,
        };

        const profile = await this.createFullProfile(newProfileData, profileId);

        return profile;
    }

    private async createMiniProfile(username: string, password: string, edition: string): Promise<string> {
        const profileId = this.hashUtil.generate();
        const scavId = this.hashUtil.generate();

        const newProfileDetails: Info = {
            id: profileId,
            scavId: scavId,
            aid: this.hashUtil.generateAccountId(),
            username: username,
            password: password,
            wipe: true,
            edition: edition,
        };

        this.saveServer.createProfile(newProfileDetails);

        await this.saveServer.loadProfile(profileId);
        await this.saveServer.saveProfile(profileId);

        return profileId;
    }

    private async createFullProfile(profileData: IProfileCreateRequestData, profileId: string): Promise<ISptProfile> {
        await this.profileController.createProfile(profileData, profileId);

        const profile = this.saveServer.getProfile(profileId);

        this.clearUnecessaryHeadlessItems(profile.characters.pmc, profileId);

        return profile;
    }

    private async generateLaunchScript(profileId: string, backendUrl: string, scriptsFolderPath: string): Promise<void> {
        try {
            if (!(await this.fileSystem.exists(scriptsFolderPath))) {
                await this.fileSystem.ensureDir(scriptsFolderPath);
            }

            const templatePath = path.join(scriptsFolderPath, "_TEMPLATE.ps1");
            const templateContent = await this.fileSystem.read(templatePath);

            const scriptName = `Start_headless_${profileId}.ps1`;
            const scriptPath = path.join(scriptsFolderPath, scriptName);
            const scriptContent = templateContent.replace("${profileId}", profileId).replace("${backendUrl}", backendUrl);

            await this.fileSystem.write(scriptPath, scriptContent);

            this.logger.success(`Generated launch script: /fika-server/assets/scripts/${scriptName}`);
        } catch (error) {
            this.logger.error(`Failed to generate launch script: ${error}`);
        }
    }

    private clearUnecessaryHeadlessItems(pmcProfile: IPmcData, sessionId: string): void {
        const itemsToDelete = this.getAllHeadlessItems(pmcProfile).map((item) => item._id);

        for (const itemIdToDelete of itemsToDelete) {
            this.inventoryHelper.removeItem(pmcProfile, itemIdToDelete, sessionId);
        }

        pmcProfile.Inventory.fastPanel = {};
    }

    private getAllHeadlessItems(pmcProfile: IPmcData): IItem[] {
        const inventoryItems = pmcProfile.Inventory.items ?? [];
        const equipmentRootId = pmcProfile?.Inventory?.equipment;
        const stashRootId = pmcProfile?.Inventory.stash;

        return inventoryItems.filter((item) => item.parentId == equipmentRootId || item.parentId == stashRootId);
    }
}
