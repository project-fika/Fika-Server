import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IHealthTreatmentRequestData } from "@spt/models/eft/health/IHealthTreatmentRequestData";
import type { IOffraidEatRequestData } from "@spt/models/eft/health/IOffraidEatRequestData";
import type { IOffraidHealRequestData } from "@spt/models/eft/health/IOffraidHealRequestData";
import type { ISyncHealthRequestData } from "@spt/models/eft/health/ISyncHealthRequestData";
import type { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
export interface IHealthCallbacks {
    onLoad(sessionID: string): ISptProfile;
    syncHealth(url: string, info: ISyncHealthRequestData, sessionID: string): any;
    offraidEat(pmcData: IPmcData, body: IOffraidEatRequestData, sessionID: string): any;
    offraidHeal(pmcData: IPmcData, body: IOffraidHealRequestData, sessionID: string): any;
    healthTreatment(pmcData: IPmcData, info: IHealthTreatmentRequestData, sessionID: string): any;
}
