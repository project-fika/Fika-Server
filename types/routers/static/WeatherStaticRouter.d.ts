import { WeatherCallbacks } from "@spt-aki/callbacks/WeatherCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class WeatherStaticRouter extends StaticRouter {
    protected weatherCallbacks: WeatherCallbacks;
    constructor(weatherCallbacks: WeatherCallbacks);
}
