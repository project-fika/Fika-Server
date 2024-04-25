import { WeatherController } from "@spt-aki/controllers/WeatherController";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { IWeatherData } from "@spt-aki/models/eft/weather/IWeatherData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
export declare class WeatherCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected weatherController: WeatherController;
    constructor(httpResponse: HttpResponseUtil, weatherController: WeatherController);
    /**
     * Handle client/weather
     * @returns IWeatherData
     */
    getWeather(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IWeatherData>;
}
