import { OwnerInfo } from "@spt/models/eft/common/request/IBaseInteractionRequestData";
import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IInventoryExamineRequestData extends IInventoryBaseActionRequestData {
    Action: "Examine";
    item: string;
    fromOwner: OwnerInfo;
}
