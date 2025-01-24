import path from "path";

import { LauncherController } from "@spt/controllers/LauncherController";
import { ProfileController } from "@spt/controllers/ProfileController";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { IProfileCreateRequestData } from "@spt/models/eft/profile/IProfileCreateRequestData";
import { ISptProfile, Info } from "@spt/models/eft/profile/ISptProfile";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { FileSystem } from "@spt/utils/FileSystem";
import { HashUtil } from "@spt/utils/HashUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";

import { inject, injectable } from "tsyringe";
import { FikaConfig } from "../../utils/FikaConfig";

@injectable()
export class FikaHeadlessProfileService {
    readonly scriptsPath = path.join(__dirname, "../../../assets/scripts");
    readonly HEAD_USEC_4 = "5fdb4139e4ed5b5ea251e4ed"; // _parent: 5cc085e214c02e000c6bea67
    readonly VOICE_USEC_4 = "6284d6a28e4092597733b7a6"; // _parent: 5fc100cf95572123ae738483

    protected httpConfig: IHttpConfig;
    public headlessProfiles: ISptProfile[] = [];

    constructor(
        @inject("LauncherController") protected launcherController: LauncherController,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("TimeUtil") protected timeUtil: TimeUtil,
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("ProfileController") protected profileController: ProfileController,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("InventoryHelper") protected inventoryHelper: InventoryHelper,
        @inject("FileSystem") protected fileSystem: FileSystem,
    ) {
        this.httpConfig = this.configServer.getConfig(ConfigTypes.HTTP);
    }

    public async init(): Promise<void> {
        const headlessConfig = this.fikaConfig.getConfig().headless;

        this.headlessProfiles = this.loadHeadlessProfiles();

        this.logger.info(`Found ${this.headlessProfiles.length} headless client profiles.`);

        const profileAmount = headlessConfig.profiles.amount;

        if (this.headlessProfiles.length < profileAmount) {
            const createdProfiles = await this.createHeadlessProfiles(profileAmount);

            for (const profile of createdProfiles) {
                this.clearHeadlessItems(profile.characters.pmc, profile.info.id);
            }

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

                const backendUrl = `http://${ip}:${port}`;

                for (const profile of createdProfiles) {
                    this.generateLaunchScript(profile, backendUrl, this.scriptsPath);
                }
            }
        }
    }

    public loadHeadlessProfiles(): ISptProfile[] {
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
        }

        return createdProfiles;
    }

    public async createHeadlessProfile(): Promise<ISptProfile> {
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

    public async createMiniProfile(username: string, password: string, edition: string): Promise<string> {
        const profileId = this.generateUniqueId();
        const scavId = this.generateUniqueId();

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

    public async createFullProfile(profileData: IProfileCreateRequestData, profileId: string): Promise<ISptProfile> {
        await this.profileController.createProfile(profileData, profileId);

        const profile = this.saveServer.getProfile(profileId);

        const originalItemsArray = profile.characters.pmc.Inventory.items.slice();

        for (const item of originalItemsArray) {
            if (!item.slotId || item._id === profile.characters.pmc.Inventory.equipment || ["SecuredContainer", "Pockets", "Scabbard"].includes(item.slotId)) {
                continue;
            }

            this.inventoryHelper.removeItem(profile.characters.pmc, item._id, profileId);
        }

        profile.characters.pmc.Inventory.fastPanel = {};

        return profile;
    }

    public async generateLaunchScript(profile: ISptProfile, backendUrl: string, targetFolderPath: string): Promise<void> {
        const scriptName = `Start_${profile.info.username}.bat`;
        const scriptPath = path.join(targetFolderPath, scriptName);
        const scriptContent = `@echo off
if NOT EXIST ".\\BepInEx\\plugins\\Fika.Headless.dll" (
    echo Could not find 'Fika.Headless.dll', please install the Headless plugin before starting the client and make sure the .bat file is in the Headless installation directory where 'EscapeFromTarkov.exe' is.
    pause
) else (
    start "" EscapeFromTarkov.exe -token=${profile.info.id} -config={'BackendUrl':'${backendUrl}','Version':'live'} -batchmode -nographics --enable-console true & exit
)`;

        try {
            if (!(await this.fileSystem.exists(targetFolderPath))) {
                await this.fileSystem.ensureDir(targetFolderPath);
            }

            await this.fileSystem.write(scriptPath, scriptContent);

            this.logger.success(`Generated launch script: /fika-server/assets/scripts/${scriptName}`);
        } catch (error) {
            this.logger.error(`Failed to generate launch script: ${error}`);
        }
    }

    private clearHeadlessItems(pmcProfile: IPmcData, sessionId: string) {
        const itemsToDelete = this.getHeadlessItems(pmcProfile).map((item) => item._id);

        for (const itemIdToDelete of itemsToDelete) {
            this.inventoryHelper.removeItem(pmcProfile, itemIdToDelete, sessionId);
        }

        pmcProfile.Inventory.fastPanel = {};
    }

    private getHeadlessItems(pmcProfile: IPmcData): IItem[] {
        const inventoryItems = pmcProfile.Inventory.items ?? [];
        const equipmentRootId = pmcProfile?.Inventory?.equipment;
        const stashRootId = pmcProfile?.Inventory.stash;

        return inventoryItems.filter((item) => item.parentId == equipmentRootId || item.parentId == stashRootId);
    }
}
