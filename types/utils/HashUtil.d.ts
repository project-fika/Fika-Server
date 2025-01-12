import crypto from "node:crypto";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { FileSystemSync } from "./FileSystemSync";
export declare class HashUtil {
    protected timeUtil: TimeUtil;
    protected fileSystemSync: FileSystemSync;
    constructor(timeUtil: TimeUtil, fileSystemSync: FileSystemSync);
    /**
     * Create a 24 character id using the sha256 algorithm + current timestamp
     * @returns 24 character hash
     */
    generate(): string;
    /**
     * is the passed in string a valid mongo id
     * @param stringToCheck String to check
     * @returns True when string is a valid mongo id
     */
    isValidMongoId(stringToCheck: string): boolean;
    generateMd5ForData(data: string): string;
    generateSha1ForData(data: string): string;
    generateCRC32ForFile(filePath: string): number;
    /**
     * Create a hash for the data parameter
     * @param algorithm algorithm to use to hash
     * @param data data to be hashed
     * @returns hash value
     */
    generateHashForData(algorithm: string, data: crypto.BinaryLike): string;
    /** Creates a SHA-1 hash asynchronously, this doesn't end up blocking.
     * @param data data to be hashed
     * @returns A promise with the hash value
     */
    generateSha1ForDataAsync(data: crypto.BinaryLike): Promise<string>;
    generateAccountId(): number;
}
