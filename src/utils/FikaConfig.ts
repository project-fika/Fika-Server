import path from "node:path";
import { inject, injectable } from "tsyringe";

import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { VFS } from "@spt/utils/VFS";

import { IFikaConfig } from "../models/fika/config/IFikaConfig";

import packageJson from "../../package.json";

@injectable()
export class FikaConfig {
    protected modAuthor: string;
    protected modName: string;
    protected modPath: string;
    protected fikaConfig: IFikaConfig;

    constructor(
        @inject("PreSptModLoader") protected preSptModLoader: PreSptModLoader,
        @inject("VFS") protected vfs: VFS,
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
    ) {
        this.modAuthor = packageJson.author.replace(/\W/g, "").toLowerCase();
        this.modName = packageJson.name.replace(/\W/g, "").toLowerCase();
        this.modPath = this.preSptModLoader.getModPath(this.getModFolderName());

        this.fikaConfig = this.jsonUtil.deserializeJsonC(this.vfs.readFile(path.join(this.modPath, "assets/configs/fika.jsonc")));
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
