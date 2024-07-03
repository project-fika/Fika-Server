import { inject, injectable } from "tsyringe";

import { VFS } from "@spt/utils/VFS";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";

import { FikaConfig } from "../../utils/FikaConfig";

@injectable()
export class FikaGroupCacheService {
    private groups: [string, IGroupCharacter[]][];
    private groupsFullPath: string;
    private readonly groupsPath = "cache/groups.json";

    constructor(
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
        @inject("VFS") protected vfs: VFS,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {
        this.groupsFullPath = `./${this.fikaConfig.getModPath()}${this.groupsPath}`;

        if (!this.vfs.exists(this.groupsFullPath)) {
            this.vfs.writeFile(this.groupsFullPath, "[]");
        }

        this.load();
    }

    public store(value: [string, IGroupCharacter[]][]) {
        this.groups = value;
        this.vfs.writeFile(this.groupsFullPath, this.jsonUtil.serialize(value));
    }

    public load() {
        this.groups = this.jsonUtil.deserialize(this.vfs.readFile(this.groupsFullPath), this.groupsFullPath);
        if (this.groups && Array.isArray(this.groups)) return;
        this.groups = []
    }

    public getGroups() {
        return this.groups;
    }
}
