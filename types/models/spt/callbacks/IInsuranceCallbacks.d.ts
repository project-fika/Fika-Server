import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IGetInsuranceCostRequestData } from "@spt/models/eft/insurance/IGetInsuranceCostRequestData";
import { IInsureRequestData } from "@spt/models/eft/insurance/IInsureRequestData";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
export interface IInsuranceCallbacks {
    onLoad(sessionID: string): ISptProfile;
    getInsuranceCost(url: string, info: IGetInsuranceCostRequestData, sessionID: string): any;
    insure(pmcData: IPmcData, body: IInsureRequestData, sessionID: string): any;
    update(secondsSinceLastRun: number): boolean;
}
