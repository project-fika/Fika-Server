import { Item } from "@spt/models/eft/common/tables/IItem";
export interface IItemDeliveryRequestData {
    items: Item[];
    traderId: string;
}
