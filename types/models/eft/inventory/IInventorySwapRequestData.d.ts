import { OwnerInfo } from "@spt-aki/models/eft/common/request/IBaseInteractionRequestData";
import { IInventoryBaseActionRequestData, To } from "@spt-aki/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventorySwapRequestData extends IInventoryBaseActionRequestData {
    Action: "Swap";
    item: string;
    to: To;
    item2: string;
    to2: To;
    fromOwner2: OwnerInfo;
    toOwner2: OwnerInfo;
}
