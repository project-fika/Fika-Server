import { MinMax } from "@spt/models/common/MinMax";
import { Season } from "@spt/models/enums/Season";
import { WindDirection } from "@spt/models/enums/WindDirection";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IWeatherConfig extends IBaseConfig {
    kind: "spt-weather";
    acceleration: number;
    weather: Weather;
    seasonDates: ISeasonDateTimes[];
    overrideSeason?: Season;
}
export interface ISeasonDateTimes {
    seasonType: Season;
    name: string;
    startDay: number;
    startMonth: number;
    endDay: number;
    endMonth: number;
}
export interface Weather {
    clouds: WeatherSettings<string>;
    windSpeed: WeatherSettings<number>;
    windDirection: WeatherSettings<WindDirection>;
    windGustiness: MinMax;
    rain: WeatherSettings<number>;
    rainIntensity: MinMax;
    fog: WeatherSettings<string>;
    temp: MinMax;
    pressure: MinMax;
}
export interface WeatherSettings<T> {
    values: T[];
    weights: number[];
}
