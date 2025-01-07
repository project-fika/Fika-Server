import { WeatherGenerator } from "@spt/generators/WeatherGenerator";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { IWeather } from "@spt/models/eft/weather/IWeatherData";
import { Season } from "@spt/models/enums/Season";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class RaidWeatherService {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected timeUtil: TimeUtil;
    protected weatherGenerator: WeatherGenerator;
    protected seasonalEventService: SeasonalEventService;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected configServer: ConfigServer;
    protected weatherConfig: IWeatherConfig;
    protected weatherForecast: IWeather[];
    constructor(logger: ILogger, databaseService: DatabaseService, timeUtil: TimeUtil, weatherGenerator: WeatherGenerator, seasonalEventService: SeasonalEventService, weightedRandomHelper: WeightedRandomHelper, configServer: ConfigServer);
    /**
     * Generate 24 hours of weather data starting from midnight today
     */
    generateWeather(currentSeason: Season): void;
    /**
     * Get a time period to increment by, e.g 15 or 30 minutes as milliseconds
     * @returns milliseconds
     */
    protected getWeightedWeatherTimePeriodMs(): number;
    /**
     * Find the first matching weather object that applies to the current time
     */
    getCurrentWeather(): IWeather | undefined;
    /**
     * Find the first matching weather object that applies to the current time + all following weather data generated
     */
    getUpcomingWeather(): IWeather[];
    /**
     * Ensure future weather data exists
     */
    protected validateWeatherDataExists(currentSeason: Season): void;
}
