import { InsuranceCallbacks } from "@spt-aki/callbacks/InsuranceCallbacks";
import { StaticRouter } from "@spt-aki/di/Router";
export declare class InsuranceStaticRouter extends StaticRouter {
    protected insuranceCallbacks: InsuranceCallbacks;
    constructor(insuranceCallbacks: InsuranceCallbacks);
}
