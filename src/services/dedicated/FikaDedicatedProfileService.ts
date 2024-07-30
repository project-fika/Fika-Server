import { inject, injectable } from "tsyringe";
import { LauncherController } from "@spt/controllers/LauncherController";
import { SaveServer } from "@spt/servers/SaveServer";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { HashUtil } from "@spt/utils/HashUtil";
import { Info, ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { ProfileController } from "@spt/controllers/ProfileController";
import { IProfileCreateRequestData } from "@spt/models/eft/profile/IProfileCreateRequestData";
import { IFikaConfigDedicated } from "../../models/fika/config/IFikaConfigDedicated";
import { FikaConfig } from "../../utils/FikaConfig";
import path from "path";
import fs from "fs";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";

@injectable()
export class FikaDedicatedProfileService {
    readonly scriptsPath = path.join(__dirname, "../../../assets/scripts");
    readonly HEAD_USEC_4 = "5fdb4139e4ed5b5ea251e4ed"; // _parent: 5cc085e214c02e000c6bea67
    readonly VOICE_USEC_4 = "6284d6a28e4092597733b7a6"; // _parent: 5fc100cf95572123ae738483

    protected httpConfig: IHttpConfig;
    protected dedicatedConfig: IFikaConfigDedicated;
    public dedicatedProfiles: ISptProfile[] = [];

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
        this.dedicatedConfig = fikaConfig.getConfig().dedicated;
        this.httpConfig = this.configServer.getConfig(ConfigTypes.HTTP);
    }

    public init() {
        this.dedicatedProfiles = this.loadDedicatedProfiles();

        this.logger.info(`Found ${this.dedicatedProfiles.length} dedicated client profiles.`);

        const profileAmount = this.dedicatedConfig.profiles.amount;

        if (this.dedicatedProfiles.length < profileAmount) {
            const createdProfiles = this.createDedicatedProfiles(profileAmount);

            this.logger.success(`Created ${createdProfiles.length} dedicated client profiles!`);

            if (this.dedicatedConfig.scripts.generate) {
                let ip = this.httpConfig.ip;
                const port = this.httpConfig.port;

                const forceIp = this.dedicatedConfig.scripts.forceIp;

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

    public loadDedicatedProfiles(): ISptProfile[] {
        let profiles: ISptProfile[] = [];

        for (const profileId in this.saveServer.getProfiles()) {
            const profile = this.saveServer.getProfile(profileId);

            if (profile.info.password == "fika-dedicated") {
                profiles.push(profile);
            }
        }

        return profiles;
    }

    public createDedicatedProfiles(profileAmount: number): ISptProfile[] {
        let profileCount = this.dedicatedProfiles.length;
        let profileAmountToCreate = profileAmount - profileCount;
        let createdProfiles: ISptProfile[] = [];

        for (let i = 0; i < profileAmountToCreate; i++) {
            const profile = this.createDedicatedProfile();
            createdProfiles.push(profile);
        }

        return createdProfiles;
    }

    public createDedicatedProfile(): ISptProfile {
        // Generate a unique username
        const username = `dedicated_${this.generateUniqueId()}`;
        // Using a password allows us to know which profiles are dedicated client profiles.
        const password = "fika-dedicated";
        // Random edition. Doesn't matter
        const edition = "Edge Of Darkness";

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
if NOT EXIST ".\\BepInEx\\plugins\\Fika.Dedicated.dll" (
    echo Could not find 'Fika.Dedicated.dll', please install the dedicated plugin before starting the client.
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
