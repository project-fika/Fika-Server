import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryReadEncyclopediaRequestData extends IInventoryBaseActionRequestData {
    Action: "ReadEncyclopedia";
    ids: string[];
}
