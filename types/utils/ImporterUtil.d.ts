import { FileSystem } from "@spt/utils/FileSystem";
import { JsonUtil } from "@spt/utils/JsonUtil";
export declare class ImporterUtil {
    protected fileSystem: FileSystem;
    protected jsonUtil: JsonUtil;
    constructor(fileSystem: FileSystem, jsonUtil: JsonUtil);
    loadAsync<T>(filepath: string, strippablePath?: string, onReadCallback?: (fileWithPath: string, data: string) => Promise<void>, onObjectDeserialized?: (fileWithPath: string, object: any) => Promise<void>): Promise<T>;
    protected placeObject<T>(fileDeserialized: any, strippedFilePath: string, result: T, strippablePath: string): void;
}
