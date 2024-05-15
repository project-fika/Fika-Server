import { MinMax } from "@spt-aki/models/common/MinMax";
import { Season } from "@spt-aki/models/enums/Season";
import { WindDirection } from "@spt-aki/models/enums/WindDirection";
import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IWeatherConfig extends IBaseConfig {
    kind: "aki-weather";
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
