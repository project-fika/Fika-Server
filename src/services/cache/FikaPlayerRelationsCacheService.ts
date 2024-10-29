import { inject, injectable } from "tsyringe";

import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { VFS } from "@spt/utils/VFS";

import { IFikaPlayerRelations } from "../../models/fika/IFikaPlayerRelations";
import { FikaConfig } from "../../utils/FikaConfig";

@injectable()
export class FikaPlayerRelationsCacheService {
    private playerRelations: Record<string, IFikaPlayerRelations>;
    private playerRelationsFullPath: string;
    private readonly playerRelationsPath = "cache/playerRelations.json";

    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
        @inject("VFS") protected vfs: VFS,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {
        this.playerRelationsFullPath = `./${this.fikaConfig.getModPath()}${this.playerRelationsPath}`;

        if (!this.vfs.exists(this.playerRelationsFullPath)) {
            this.vfs.writeFile(this.playerRelationsFullPath, "{}");
        }

        this.playerRelations = this.jsonUtil.deserialize(this.vfs.readFile(this.playerRelationsFullPath), this.playerRelationsFullPath);
    }

    public postInit() {
        const profiles = this.profileHelper.getProfiles();
        const profileIds = Object.keys(profiles);
        var shouldSave = false;

        for (const profileId of profileIds) {
            if (!this.playerRelations[profileId]) {
                this.storeValue(profileId, {
                    Friends: [],
                    Ignore: [],
                });

                continue;
            }

            const originalFriends = this.playerRelations[profileId].Friends;
            const friendsToSearch = [...this.playerRelations[profileId].Friends];
            for (const friend of friendsToSearch) {
                if (!profileIds.includes(friend)) {
                    const index = originalFriends.indexOf(friend);
                    if (index > -1) {
                        this.logger.warning("Deleting missing profile from friends: " + friend);
                        originalFriends.splice(index, 1);
                        shouldSave = true;
                    }
                }
            }

            const originalIgnore = this.playerRelations[profileId].Ignore;
            const ignoreToSearch = [...this.playerRelations[profileId].Ignore];
            for (const ignore of ignoreToSearch) {
                if (!profileIds.includes(ignore)) {
                    const index = originalIgnore.indexOf(ignore);
                    if (index > -1) {
                        this.logger.warning("Deleting missing profile from ignores: " + ignore);
                        originalIgnore.splice(index, 1);
                        shouldSave = true;
                    }
                }
            }
        }

        if (shouldSave) {
            this.vfs.writeFile(this.playerRelationsFullPath, this.jsonUtil.serialize(this.playerRelations));
        }
    }

    public getKeys(): string[] {
        return Object.keys(this.playerRelations);
    }

    public getStoredValue(key: string): IFikaPlayerRelations {
        if (!this.playerRelations[key]) {
            this.storeValue(key, {
                Friends: [],
                Ignore: [],
            });
        }

        return this.playerRelations[key];
    }

    public storeValue(key: string, value: IFikaPlayerRelations): void {
        this.playerRelations[key] = value;

        this.vfs.writeFile(this.playerRelationsFullPath, this.jsonUtil.serialize(this.playerRelations));
    }
}
