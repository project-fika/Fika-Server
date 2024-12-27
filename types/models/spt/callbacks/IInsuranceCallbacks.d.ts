import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IGetInsuranceCostRequestData } from "@spt/models/eft/insurance/IGetInsuranceCostRequestData";
import type { IInsureRequestData } from "@spt/models/eft/insurance/IInsureRequestData";
import type { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
export interface IInsuranceCallbacks {
    onLoad(sessionID: string): ISptProfile;
    getInsuranceCost(url: string, info: IGetInsuranceCostRequestData, sessionID: string): any;
    insure(pmcData: IPmcData, body: IInsureRequestData, sessionID: string): any;
    update(secondsSinceLastRun: number): boolean;
}
