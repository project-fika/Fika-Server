import { IBaseInteractionRequestData } from "@spt/models/eft/common/request/IBaseInteractionRequestData";
import { IItemLocation } from "@spt/models/eft/common/tables/IItem";
export interface IInventoryBaseActionRequestData extends IBaseInteractionRequestData {
}
export interface To {
    id: string;
    container: string;
    location?: IItemLocation | number;
    isSearched?: boolean;
}
export interface Container {
    id: string;
    container: string;
    location?: Location | number;
}
export interface Location {
    x: number;
    y: number;
    r: string;
    rotation?: string;
    isSearched: boolean;
}
