import { CustomizationCallbacks } from "@spt-aki/callbacks/CustomizationCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class CustomizationStaticRouter extends StaticRouter {
    protected customizationCallbacks: CustomizationCallbacks;
    constructor(customizationCallbacks: CustomizationCallbacks);
}
