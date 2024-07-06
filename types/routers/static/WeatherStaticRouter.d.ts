import { WeatherCallbacks } from "@spt/callbacks/WeatherCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class WeatherStaticRouter extends StaticRouter {
    protected weatherCallbacks: WeatherCallbacks;
    constructor(weatherCallbacks: WeatherCallbacks);
}
