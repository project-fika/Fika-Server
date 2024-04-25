import { Item } from "@spt-aki/models/eft/common/tables/IItem";
export interface IRagfairAssortGenerator {
    getAssortItems(): Item[];
}
