import { WeatherGenerator } from "@spt-aki/generators/WeatherGenerator";
import { IWeatherData } from "@spt-aki/models/eft/weather/IWeatherData";
import { IWeatherConfig } from "@spt-aki/models/spt/config/IWeatherConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
export declare class WeatherController {
    protected weatherGenerator: WeatherGenerator;
    protected logger: ILogger;
    protected configServer: ConfigServer;
    protected weatherConfig: IWeatherConfig;
    constructor(weatherGenerator: WeatherGenerator, logger: ILogger, configServer: ConfigServer);
    /** Handle client/weather */
    generate(): IWeatherData;
    /**
     * Get the current in-raid time (MUST HAVE PLAYER LOGGED INTO CLIENT TO WORK)
     * @returns Date object
     */
    getCurrentInRaidTime(): Date;
}
