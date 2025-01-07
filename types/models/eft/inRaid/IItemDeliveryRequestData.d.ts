import { IItem } from "@spt/models/eft/common/tables/IItem";
export interface IItemDeliveryRequestData {
    items: IItem[];
    traderId: string;
}
