import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { VFS } from "@spt/utils/VFS";
export declare class ConfigServer {
    protected logger: ILogger;
    protected vfs: VFS;
    protected jsonUtil: JsonUtil;
    protected configs: Record<string, any>;
    protected readonly acceptableFileExtensions: string[];
    constructor(logger: ILogger, vfs: VFS, jsonUtil: JsonUtil);
    getConfig<T>(configType: ConfigTypes): T;
    getConfigByString<T>(configType: string): T;
    initialize(): void;
}
