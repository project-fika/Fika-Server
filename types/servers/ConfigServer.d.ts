import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS";
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
