import { ApplicationContext } from "@spt/context/ApplicationContext";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { IWeather, IWeatherData } from "@spt/models/eft/weather/IWeatherData";
import { WindDirection } from "@spt/models/enums/WindDirection";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class WeatherGenerator {
    protected weightedRandomHelper: WeightedRandomHelper;
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected timeUtil: TimeUtil;
    protected seasonalEventService: SeasonalEventService;
    protected applicationContext: ApplicationContext;
    protected configServer: ConfigServer;
    protected weatherConfig: IWeatherConfig;
    private serverStartTimestampMS;
    constructor(weightedRandomHelper: WeightedRandomHelper, logger: ILogger, randomUtil: RandomUtil, timeUtil: TimeUtil, seasonalEventService: SeasonalEventService, applicationContext: ApplicationContext, configServer: ConfigServer);
    /**
     * Get current + raid datetime and format into correct BSG format and return
     * @param data Weather data
     * @returns IWeatherData
     */
    calculateGameTime(data: IWeatherData): IWeatherData;
    /**
     * Get server uptime seconds multiplied by a multiplier and add to current time as seconds
     * Format to BSGs requirements
     * @param currentDate current date
     * @returns formatted time
     */
    protected getBsgFormattedInRaidTime(): string;
    /**
     * Get the current in-raid time
     * @param currentDate (new Date())
     * @returns Date object of current in-raid time
     */
    getInRaidTime(): Date;
    /**
     * Get current time formatted to fit BSGs requirement
     * @param date date to format into bsg style
     * @returns Time formatted in BSG format
     */
    protected getBSGFormattedTime(date: Date): string;
    /**
     * Return randomised Weather data with help of config/weather.json
     * @returns Randomised weather data
     */
    generateWeather(): IWeather;
    /**
     * Set IWeather date/time/timestamp values to now
     * @param weather Object to update
     */
    protected setCurrentDateTime(weather: IWeather): void;
    protected getWeightedWindDirection(): WindDirection;
    protected getWeightedClouds(): number;
    protected getWeightedWindSpeed(): number;
    protected getWeightedFog(): number;
    protected getWeightedRain(): number;
    protected getRandomFloat(node: string): number;
}
