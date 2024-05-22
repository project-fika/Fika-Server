/// <reference types="node" />
import fs from "node:fs";
import winston from "winston";
import { Daum } from "@spt/models/eft/itemEvent/IItemEventRouterRequest";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { SptLogger } from "@spt/models/spt/logging/SptLogger";
import { IAsyncQueue } from "@spt/models/spt/utils/IAsyncQueue";
import { ILogger } from "@spt/models/spt/utils/ILogger";
export declare abstract class AbstractWinstonLogger implements ILogger {
    protected asyncQueue: IAsyncQueue;
    protected showDebugInConsole: boolean;
    protected filePath: string;
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
    protected writeFilePromisify: (path: fs.PathLike, data: string, options?: any) => Promise<void>;
    constructor(asyncQueue: IAsyncQueue);
    protected abstract isLogToFile(): boolean;
    protected abstract isLogToConsole(): boolean;
    protected abstract isLogExceptions(): boolean;
    protected abstract getFilePath(): string;
    protected abstract getFileName(): string;
    protected getLogFrequency(): string;
    protected getLogMaxSize(): string;
    protected getLogMaxFiles(): string;
    writeToLogFile(data: string | Daum): Promise<void>;
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
