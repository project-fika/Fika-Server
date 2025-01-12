import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ModHashCacheService } from "@spt/services/cache/ModHashCacheService";
import { FileSystem } from "@spt/utils/FileSystem";
import { FileSystemSync } from "@spt/utils/FileSystemSync";
import { CompilerOptions } from "typescript";
export declare class ModCompilerService {
    protected logger: ILogger;
    protected modHashCacheService: ModHashCacheService;
    protected fileSystem: FileSystem;
    protected fileSystemSync: FileSystemSync;
    protected serverDependencies: string[];
    constructor(logger: ILogger, modHashCacheService: ModHashCacheService, fileSystem: FileSystem, fileSystemSync: FileSystemSync);
    /**
     * Convert a mods TS into JS
     * @param modName Name of mod
     * @param modPath Dir path to mod
     * @param modTypeScriptFiles
     * @returns
     */
    compileMod(modName: string, modPath: string, modTypeScriptFiles: string[]): Promise<void>;
    /**
     * Convert a TS file into JS
     * @param fileNames Paths to TS files
     * @param options Compiler options
     */
    protected compile(fileNames: string[], options: CompilerOptions): Promise<void>;
    /**
     * Do the files at the provided paths exist
     * @param fileNames
     * @returns
     */
    protected areFilesReady(fileNames: string[]): Promise<boolean>;
    /**
     * Wait the provided number of milliseconds
     * @param ms Milliseconds
     * @returns
     */
    protected delay(ms: number): Promise<unknown>;
}
