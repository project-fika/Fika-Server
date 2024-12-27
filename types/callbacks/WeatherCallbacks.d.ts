import { WeatherController } from "@spt/controllers/WeatherController";
import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IWeatherData } from "@spt/models/eft/weather/IWeatherData";
import type { IGetLocalWeatherResponseData } from "@spt/models/spt/weather/IGetLocalWeatherResponseData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class WeatherCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected weatherController: WeatherController;
    constructor(httpResponse: HttpResponseUtil, weatherController: WeatherController);
    /**
     * Handle client/weather
     * @returns IWeatherData
     */
    getWeather(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IWeatherData>;
    /** Handle client/localGame/weather */
    getLocalWeather(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGetLocalWeatherResponseData>;
}
