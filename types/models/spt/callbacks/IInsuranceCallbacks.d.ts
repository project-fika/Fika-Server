import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IGetInsuranceCostRequestData } from "@spt-aki/models/eft/insurance/IGetInsuranceCostRequestData";
import { IInsureRequestData } from "@spt-aki/models/eft/insurance/IInsureRequestData";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
export interface IInsuranceCallbacks {
    onLoad(sessionID: string): IAkiProfile;
    getInsuranceCost(url: string, info: IGetInsuranceCostRequestData, sessionID: string): any;
    insure(pmcData: IPmcData, body: IInsureRequestData, sessionID: string): any;
    update(secondsSinceLastRun: number): boolean;
}
