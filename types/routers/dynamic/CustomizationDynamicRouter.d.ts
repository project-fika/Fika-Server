import { CustomizationCallbacks } from "@spt/callbacks/CustomizationCallbacks";
import { DynamicRouter } from "@spt/di/Router";
export declare class CustomizationDynamicRouter extends DynamicRouter {
    protected customizationCallbacks: CustomizationCallbacks;
    constructor(customizationCallbacks: CustomizationCallbacks);
}
