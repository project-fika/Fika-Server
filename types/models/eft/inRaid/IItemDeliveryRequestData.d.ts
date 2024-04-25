import { Item } from "../common/tables/IItem";
export interface IItemDeliveryRequestData {
    items: Item[];
    traderId: string;
}
