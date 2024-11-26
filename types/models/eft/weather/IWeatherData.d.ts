import { Season } from "@spt/models/enums/Season";
import { WindDirection } from "@spt/models/enums/WindDirection";
export interface IWeatherData {
    acceleration: number;
    time: string;
    date: string;
    weather: IWeather;
    season: Season;
}
export interface IWeather {
    pressure: number;
    temp: number;
    fog: number;
    rain_intensity: number;
    /** 1 - 3 light rain, 3+ 'rain' */
    rain: number;
    wind_gustiness: number;
    wind_direction: WindDirection;
    wind_speed: number;
    /** < -0.4 = clear day */
    cloud: number;
    time: string;
    date: string;
    timestamp: number;
    sptInRaidTimestamp: number;
}
