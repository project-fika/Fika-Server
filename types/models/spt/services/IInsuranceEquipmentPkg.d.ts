import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IItem } from "@spt/models/eft/common/tables/IItem";
export interface IInsuranceEquipmentPkg {
    sessionID: string;
    pmcData: IPmcData;
    itemToReturnToPlayer: IItem;
    traderId: string;
}
