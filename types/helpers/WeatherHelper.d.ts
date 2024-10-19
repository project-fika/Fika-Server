import { DateTime } from "@spt/models/enums/DateTime";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class WeatherHelper {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected configServer: ConfigServer;
    protected weatherConfig: IWeatherConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, configServer: ConfigServer);
    /**
     * Get the current in-raid time
     * @param currentDate (new Date())
     * @returns Date object of current in-raid time
     */
    getInRaidTime(timestamp?: number): Date;
    /**
     * Is the current raid at nighttime
     * @param timeVariant PASS OR CURR (from raid settings)
     * @returns True when nighttime
     */
    isNightTime(timeVariant: DateTime): boolean;
    isHourAtNightTime(currentHour: number): boolean;
}
