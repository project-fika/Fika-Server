import { JsonUtil } from "@spt/utils/JsonUtil";
import { VFS } from "@spt/utils/VFS";
export declare class ImporterUtil {
    protected vfs: VFS;
    protected jsonUtil: JsonUtil;
    constructor(vfs: VFS, jsonUtil: JsonUtil);
    /**
     * Load files into js objects recursively (asynchronous)
     * @param filepath Path to folder with files
     * @returns Promise<T> return T type associated with this class
     */
    loadRecursiveAsync<T>(filepath: string, onReadCallback?: (fileWithPath: string, data: string) => void, onObjectDeserialized?: (fileWithPath: string, object: any) => void): Promise<T>;
    /**
     * Load files into js objects recursively (synchronous)
     * @param filepath Path to folder with files
     * @returns
     */
    loadRecursive<T>(filepath: string, onReadCallback?: (fileWithPath: string, data: string) => void, onObjectDeserialized?: (fileWithPath: string, object: any) => void): T;
    loadAsync<T>(filepath: string, strippablePath?: string, onReadCallback?: (fileWithPath: string, data: string) => void, onObjectDeserialized?: (fileWithPath: string, object: any) => void): Promise<T>;
    protected placeObject<T>(fileDeserialized: any, strippedFilePath: string, result: T, strippablePath: string): void;
}
