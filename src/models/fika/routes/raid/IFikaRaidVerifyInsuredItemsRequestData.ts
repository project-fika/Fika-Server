import { InsuredItem } from "@spt/models/eft/common/tables/IBotBase";

export interface IFikaRaidVerifyInsuredItemsRequestData {
    insuranceDatas: Record<string, InsuredItem[]>;
}
