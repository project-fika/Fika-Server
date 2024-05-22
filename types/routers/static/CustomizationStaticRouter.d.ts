import { CustomizationCallbacks } from "@spt/callbacks/CustomizationCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class CustomizationStaticRouter extends StaticRouter {
    protected customizationCallbacks: CustomizationCallbacks;
    constructor(customizationCallbacks: CustomizationCallbacks);
}
