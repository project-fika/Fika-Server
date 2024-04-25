import { IInventoryBaseActionRequestData } from "@spt-aki/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryReadEncyclopediaRequestData extends IInventoryBaseActionRequestData {
    Action: "ReadEncyclopedia";
    ids: string[];
}
