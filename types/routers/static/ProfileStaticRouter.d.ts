import { ProfileCallbacks } from "@spt-aki/callbacks/ProfileCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class ProfileStaticRouter extends StaticRouter {
    protected profileCallbacks: ProfileCallbacks;
    constructor(profileCallbacks: ProfileCallbacks);
}
