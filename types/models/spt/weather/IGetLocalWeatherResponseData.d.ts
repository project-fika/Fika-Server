import { IWeather } from "@spt/models/eft/weather/IWeatherData";
export interface IGetLocalWeatherResponseData {
    season: number;
    weather: IWeather[];
}
