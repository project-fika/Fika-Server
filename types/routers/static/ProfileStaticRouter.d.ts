import { ProfileCallbacks } from "@spt/callbacks/ProfileCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class ProfileStaticRouter extends StaticRouter {
    protected profileCallbacks: ProfileCallbacks;
    constructor(profileCallbacks: ProfileCallbacks);
}
