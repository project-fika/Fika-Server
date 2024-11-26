import { ApplicationContext } from "@spt/context/ApplicationContext";
import { WeatherHelper } from "@spt/helpers/WeatherHelper";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { IWeather, IWeatherData } from "@spt/models/eft/weather/IWeatherData";
import { Season } from "@spt/models/enums/Season";
import { WindDirection } from "@spt/models/enums/WindDirection";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class WeatherGenerator {
    protected weightedRandomHelper: WeightedRandomHelper;
    protected weatherHelper: WeatherHelper;
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected timeUtil: TimeUtil;
    protected seasonalEventService: SeasonalEventService;
    protected applicationContext: ApplicationContext;
    protected configServer: ConfigServer;
    protected weatherConfig: IWeatherConfig;
    private serverStartTimestampMS;
    constructor(weightedRandomHelper: WeightedRandomHelper, weatherHelper: WeatherHelper, logger: ILogger, randomUtil: RandomUtil, timeUtil: TimeUtil, seasonalEventService: SeasonalEventService, applicationContext: ApplicationContext, configServer: ConfigServer);
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
     * Get current time formatted to fit BSGs requirement
     * @param date date to format into bsg style
     * @returns Time formatted in BSG format
     */
    protected getBSGFormattedTime(date: Date): string;
    /**
     * Return randomised Weather data with help of config/weather.json
     * @param currentSeason the currently active season
     * @param timestamp OPTIONAL what timestamp to generate the weather data at, defaults to now when not supplied
     * @returns Randomised weather data
     */
    generateWeather(currentSeason: Season, timestamp?: number): IWeather;
    /**
     * Choose a temprature for the raid based on time of day and current season
     * @param currentSeason What season tarkov is currently in
     * @param inRaidTimestamp What time is the raid running at
     * @returns Timestamp
     */
    protected getRaidTemperature(currentSeason: Season, inRaidTimestamp: number): number;
    /**
     * Set IWeather date/time/timestamp values to now
     * @param weather Object to update
     * @param timestamp OPTIONAL, define timestamp used
     */
    protected setCurrentDateTime(weather: IWeather, timestamp?: number): void;
    protected getWeightedWindDirection(): WindDirection;
    protected getWeightedClouds(): number;
    protected getWeightedWindSpeed(): number;
    protected getWeightedFog(): number;
    protected getWeightedRain(): number;
    protected getRandomFloat(node: string, precision?: number): number;
}
