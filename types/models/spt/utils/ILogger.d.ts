import { Daum } from "@spt-aki/models/eft/itemEvent/IItemEventRouterRequest";
import { LogBackgroundColor } from "@spt-aki/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
export interface ILogger {
    writeToLogFile(data: string | Daum): void;
    log(data: string | Record<string, unknown> | Error, color: string, backgroundColor?: string): void;
    logWithColor(data: string | Record<string, unknown>, textColor: LogTextColor, backgroundColor?: LogBackgroundColor): void;
    error(data: string): void;
    warning(data: string): void;
    success(data: string): void;
    info(data: string): void;
    debug(data: string | Record<string, unknown>, onlyShowInConsole?: boolean): void;
}
