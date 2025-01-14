import fs from "fs";
import path from "path";
import { LauncherController } from "@spt/controllers/LauncherController";
import { ProfileController } from "@spt/controllers/ProfileController";
import { IProfileCreateRequestData } from "@spt/models/eft/profile/IProfileCreateRequestData";
import { ISptProfile, Info } from "@spt/models/eft/profile/ISptProfile";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { inject, injectable } from "tsyringe";
import { IFikaConfigHeadless } from "../../models/fika/config/IFikaConfigHeadless";
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
        @inject("RandomUtil") protected randomUtil: RandomUtil,
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("ProfileController") protected profileController: ProfileController,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
        @inject("ConfigServer") protected configServer: ConfigServer,
    ) {
        this.httpConfig = this.configServer.getConfig(ConfigTypes.HTTP);
    }

    public init() {
        const headlessConfig = this.fikaConfig.getConfig().headless;

        this.headlessProfiles = this.loadHeadlessProfiles();

        this.logger.info(`Found ${this.headlessProfiles.length} headless client profiles.`);

        const profileAmount = headlessConfig.profiles.amount;

        if (this.headlessProfiles.length < profileAmount) {
            const createdProfiles = this.createHeadlessProfiles(profileAmount);

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

            if (profile.info.password == "fika-headless") {
                profiles.push(profile);
            }
        }

        return profiles;
    }

    public createHeadlessProfiles(profileAmount: number): ISptProfile[] {
        let profileCount = this.headlessProfiles.length;
        let profileAmountToCreate = profileAmount - profileCount;
        let createdProfiles: ISptProfile[] = [];

        for (let i = 0; i < profileAmountToCreate; i++) {
            const profile = this.createHeadlessProfile();
            createdProfiles.push(profile);
        }

        return createdProfiles;
    }

    public createHeadlessProfile(): ISptProfile {
        // Generate a unique username
        const username = `headless_${this.generateUniqueId()}`;
        // Using a password allows us to know which profiles are headless client profiles.
        const password = "fika-headless";
        // Random edition. Doesn't matter
        const edition = "Standard";

        // Create mini profile
        const profileId = this.createMiniProfile(username, password, edition);

        // Random character configs. Doesn't matter.
        const newProfileData: IProfileCreateRequestData = {
            side: "usec",
            nickname: username, // Use the username as the nickname to ensure it is unique.
            headId: this.HEAD_USEC_4,
            voiceId: this.VOICE_USEC_4,
        };

        const profile = this.createFullProfile(newProfileData, profileId);

        return profile;
    }

    public createMiniProfile(username: string, password: string, edition: string): string {
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

        this.saveServer.loadProfile(profileId);
        this.saveServer.saveProfile(profileId);

        return profileId;
    }

    public createFullProfile(profileData: IProfileCreateRequestData, profileId: string) {
        this.profileController.createProfile(profileData, profileId);

        const profile = this.saveServer.getProfile(profileId);

        return profile;
    }

    public generateLaunchScript(profile: ISptProfile, backendUrl: string, targetFolderPath: string) {
        const scriptName = `Start_${profile.info.username}.bat`;
        const scriptPath = path.join(targetFolderPath, scriptName);
        const scriptContent = `@echo off
if NOT EXIST ".\\BepInEx\\plugins\\Fika.Headless.dll" (
    echo Could not find 'Fika.Headless.dll', please install the Headless plugin before starting the client.
    pause
) else (
    start "" EscapeFromTarkov.exe -token=${profile.info.id} -config={"BackendUrl":"${backendUrl}","Version":"live"} -batchmode -nographics --enable-console true & exit
)`;

        try {
            if (!fs.existsSync(targetFolderPath)) {
                fs.mkdirSync(targetFolderPath);
            }

            fs.writeFileSync(scriptPath, scriptContent);

            this.logger.success(`Generated launch script: /fika-server/assets/scripts/${scriptName}`);
        } catch (error) {
            this.logger.error(`Failed to generate launch script: ${error}`);
        }
    }

    // generateProfileId
    protected generateUniqueId(): string {
        const timestamp = this.timeUtil.getTimestamp();

        return this.formatID(timestamp, timestamp * this.randomUtil.getInt(1, 1000000));
    }

    protected formatID(timeStamp: number, counter: number): string {
        const timeStampStr = timeStamp.toString(16).padStart(8, "0");
        const counterStr = counter.toString(16).padStart(16, "0");

        return timeStampStr.toLowerCase() + counterStr.toLowerCase();
    }
}
