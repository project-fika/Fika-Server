import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
export interface IInsuranceEquipmentPkg {
    sessionID: string;
    pmcData: IPmcData;
    itemToReturnToPlayer: Item;
    traderId: string;
}
