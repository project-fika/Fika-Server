import { IDaum } from "@spt/models/eft/itemEvent/IItemEventRouterRequest";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { SptLogger } from "@spt/models/spt/logging/SptLogger";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { FileSystem } from "@spt/utils/FileSystem";
import { FileSystemSync } from "@spt/utils/FileSystemSync";
import winston from "winston";
export declare abstract class AbstractWinstonLogger implements ILogger {
    protected showDebugInConsole: boolean;
    protected filePath: string;
    protected fileSystem: FileSystem;
    protected fileSystemSync: FileSystemSync;
    protected logLevels: {
        levels: {
            error: number;
            warn: number;
            succ: number;
            info: number;
            custom: number;
            debug: number;
        };
        colors: {
            error: string;
            warn: string;
            succ: string;
            info: string;
            custom: string;
            debug: string;
        };
        bgColors: {
            default: string;
            blackBG: string;
            redBG: string;
            greenBG: string;
            yellowBG: string;
            blueBG: string;
            magentaBG: string;
            cyanBG: string;
            whiteBG: string;
        };
    };
    protected logger: winston.Logger & SptLogger;
    constructor(fileSystem: FileSystem, fileSystemSync: FileSystemSync);
    protected abstract isLogToFile(): boolean;
    protected abstract isLogToConsole(): boolean;
    protected abstract isLogExceptions(): boolean;
    protected abstract getFilePath(): string;
    protected abstract getFileName(): string;
    protected getLogFrequency(): string;
    protected getLogMaxSize(): string;
    protected getLogMaxFiles(): string;
    writeToLogFile(data: string | IDaum): Promise<void>;
    log(data: string | Error | Record<string, unknown>, color: string, backgroundColor?: string): Promise<void>;
    error(data: string | Record<string, unknown>): Promise<void>;
    warning(data: string | Record<string, unknown>): Promise<void>;
    success(data: string | Record<string, unknown>): Promise<void>;
    info(data: string | Record<string, unknown>): Promise<void>;
    /**
     * Log to console text with a customisable text and background color. Background defaults to black
     * @param data text to log
     * @param textColor color of text
     * @param backgroundColor color of background
     */
    logWithColor(data: string | Record<string, unknown>, textColor: LogTextColor, backgroundColor?: LogBackgroundColor): Promise<void>;
    debug(data: string | Record<string, unknown>, onlyShowInConsole?: boolean): Promise<void>;
}
