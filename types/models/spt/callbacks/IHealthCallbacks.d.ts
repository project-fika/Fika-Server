import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IHealthTreatmentRequestData } from "@spt-aki/models/eft/health/IHealthTreatmentRequestData";
import { IOffraidEatRequestData } from "@spt-aki/models/eft/health/IOffraidEatRequestData";
import { IOffraidHealRequestData } from "@spt-aki/models/eft/health/IOffraidHealRequestData";
import { ISyncHealthRequestData } from "@spt-aki/models/eft/health/ISyncHealthRequestData";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
export interface IHealthCallbacks {
    onLoad(sessionID: string): IAkiProfile;
    syncHealth(url: string, info: ISyncHealthRequestData, sessionID: string): any;
    offraidEat(pmcData: IPmcData, body: IOffraidEatRequestData, sessionID: string): any;
    offraidHeal(pmcData: IPmcData, body: IOffraidHealRequestData, sessionID: string): any;
    healthTreatment(pmcData: IPmcData, info: IHealthTreatmentRequestData, sessionID: string): any;
}
