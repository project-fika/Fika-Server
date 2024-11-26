import { IItem } from "@spt/models/eft/common/tables/IItem";
export interface IRagfairAssortGenerator {
    getAssortItems(): IItem[];
}
