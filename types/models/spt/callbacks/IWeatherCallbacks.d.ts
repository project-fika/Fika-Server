import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
export interface IWeatherCallbacks {
    getWeather(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
}
