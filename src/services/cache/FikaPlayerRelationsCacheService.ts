import { inject, injectable } from "tsyringe";

import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS";

import { IFikaPlayerRelations } from "../../models/fika/IFikaPlayerRelations";
import { FikaConfig } from "../../utils/FikaConfig";

@injectable()
export class FikaPlayerRelationsCacheService {
    private playerRelations: Record<string, IFikaPlayerRelations>;
    private playerRelationsFullPath: string;
    private readonly playerRelationsPath = "cache/playerRelations.json";

    constructor(
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

        const profiles = this.profileHelper.getProfiles();

        for (const profileId of Object.keys(profiles)) {
            if (!this.playerRelations[profileId]) {
                this.storeValue(profileId, {
                    Friends: [],
                    Ignore: [],
                });
            }
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
