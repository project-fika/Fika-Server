import { OwnerInfo } from "@spt/models/eft/common/request/IBaseInteractionRequestData";
import { IInventoryBaseActionRequestData, ITo } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventorySwapRequestData extends IInventoryBaseActionRequestData {
    Action: "Swap";
    item: string;
    to: ITo;
    item2: string;
    to2: ITo;
    fromOwner2: OwnerInfo;
    toOwner2: OwnerInfo;
}
