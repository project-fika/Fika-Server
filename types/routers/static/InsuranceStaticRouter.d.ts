import { InsuranceCallbacks } from "@spt/callbacks/InsuranceCallbacks";
import { StaticRouter } from "@spt/di/Router";
export declare class InsuranceStaticRouter extends StaticRouter {
    protected insuranceCallbacks: InsuranceCallbacks;
    constructor(insuranceCallbacks: InsuranceCallbacks);
}
