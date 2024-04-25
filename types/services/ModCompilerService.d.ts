import ts from "typescript";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ModHashCacheService } from "@spt-aki/services/cache/ModHashCacheService";
import { VFS } from "@spt-aki/utils/VFS";
export declare class ModCompilerService {
    protected logger: ILogger;
    protected modHashCacheService: ModHashCacheService;
    protected vfs: VFS;
    protected serverDependencies: string[];
    constructor(logger: ILogger, modHashCacheService: ModHashCacheService, vfs: VFS);
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
    protected compile(fileNames: string[], options: ts.CompilerOptions): Promise<void>;
    /**
     * Do the files at the provided paths exist
     * @param fileNames
     * @returns
     */
    protected areFilesReady(fileNames: string[]): boolean;
    /**
     * Wait the provided number of milliseconds
     * @param ms Milliseconds
     * @returns
     */
    protected delay(ms: number): Promise<unknown>;
}
