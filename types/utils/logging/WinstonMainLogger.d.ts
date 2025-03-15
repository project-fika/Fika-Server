import { FileSystem } from "@spt/utils/FileSystem";
import { FileSystemSync } from "@spt/utils/FileSystemSync";
import { AbstractWinstonLogger } from "@spt/utils/logging/AbstractWinstonLogger";
export declare class WinstonMainLogger extends AbstractWinstonLogger {
    constructor(fileSystem: FileSystem, fileSystemSync: FileSystemSync);
    protected isLogExceptions(): boolean;
    protected isLogToFile(): boolean;
    protected isLogToConsole(): boolean;
    protected getFilePath(): string;
    protected getFileName(): string;
}
