import { CustomizationCallbacks } from "@spt-aki/callbacks/CustomizationCallbacks";
import { DynamicRouter } from "@spt-aki/di/Router";
export declare class CustomizationDynamicRouter extends DynamicRouter {
    protected customizationCallbacks: CustomizationCallbacks;
    constructor(customizationCallbacks: CustomizationCallbacks);
}
