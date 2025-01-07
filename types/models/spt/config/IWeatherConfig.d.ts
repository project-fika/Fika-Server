import { MinMax } from "@spt/models/common/MinMax";
import { Season } from "@spt/models/enums/Season";
import { WindDirection } from "@spt/models/enums/WindDirection";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IWeatherConfig extends IBaseConfig {
    kind: "spt-weather";
    acceleration: number;
    weather: IWeatherValues;
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
export interface IWeatherValues {
    seasonValues: Record<string, ISeasonalValues>;
    /** How many hours to generate weather data into the future */
    generateWeatherAmountHours: number;
    /** Length of each weather period */
    timePeriod: WeatherSettings<number>;
}
export interface ISeasonalValues {
    clouds: WeatherSettings<string>;
    windSpeed: WeatherSettings<number>;
    windDirection: WeatherSettings<WindDirection>;
    windGustiness: MinMax;
    rain: WeatherSettings<number>;
    rainIntensity: MinMax;
    fog: WeatherSettings<string>;
    temp: ITempDayNight;
    pressure: MinMax;
}
export interface ITempDayNight {
    day: MinMax;
    night: MinMax;
}
export interface WeatherSettings<T> {
    values: T[];
    weights: number[];
}
