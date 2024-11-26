import { WeatherGenerator } from "@spt/generators/WeatherGenerator";
import { WeatherHelper } from "@spt/helpers/WeatherHelper";
import { IWeatherData } from "@spt/models/eft/weather/IWeatherData";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IGetLocalWeatherResponseData } from "@spt/models/spt/weather/IGetLocalWeatherResponseData";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { RaidWeatherService } from "@spt/services/RaidWeatherService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
export declare class WeatherController {
    protected weatherGenerator: WeatherGenerator;
    protected logger: ILogger;
    protected configServer: ConfigServer;
    protected seasonalEventService: SeasonalEventService;
    protected raidWeatherService: RaidWeatherService;
    protected weatherHelper: WeatherHelper;
    protected weatherConfig: IWeatherConfig;
    constructor(weatherGenerator: WeatherGenerator, logger: ILogger, configServer: ConfigServer, seasonalEventService: SeasonalEventService, raidWeatherService: RaidWeatherService, weatherHelper: WeatherHelper);
    /** Handle client/weather */
    generate(): IWeatherData;
    /**
     * Get the current in-raid time (MUST HAVE PLAYER LOGGED INTO CLIENT TO WORK)
     * @returns Date object
     */
    getCurrentInRaidTime(): Date;
    /** Handle client/localGame/weather */
    generateLocal(sesssionId: string): IGetLocalWeatherResponseData;
}
