import { WeatherController } from "@spt/controllers/WeatherController";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { IWeatherData } from "@spt/models/eft/weather/IWeatherData";
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
}
