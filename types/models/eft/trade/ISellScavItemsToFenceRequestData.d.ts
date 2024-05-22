import { OwnerInfo } from "@spt/models/eft/common/request/IBaseInteractionRequestData";
export interface ISellScavItemsToFenceRequestData {
    Action: "SellAllFromSavage";
    totalValue: number;
    fromOwner: OwnerInfo;
    toOwner: OwnerInfo;
}
