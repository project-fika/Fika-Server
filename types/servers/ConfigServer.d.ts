import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { FileSystemSync } from "@spt/utils/FileSystemSync";
import { JsonUtil } from "@spt/utils/JsonUtil";
export declare class ConfigServer {
    protected logger: ILogger;
    protected fileSystemSync: FileSystemSync;
    protected jsonUtil: JsonUtil;
    protected configs: Record<string, any>;
    protected readonly acceptableFileExtensions: string[];
    constructor(logger: ILogger, fileSystemSync: FileSystemSync, jsonUtil: JsonUtil);
    getConfig<T>(configType: ConfigTypes): T;
    getConfigByString<T>(configType: string): T;
    initialize(): void;
}
