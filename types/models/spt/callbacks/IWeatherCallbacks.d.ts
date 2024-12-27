import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
export interface IWeatherCallbacks {
    getWeather(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
}
