import { IInventoryBaseActionRequestData } from "@spt/models/eft/inventory/IInventoryBaseActionRequestData";
export interface IRedeemProfileRequestData extends IInventoryBaseActionRequestData {
    Action: "RedeemProfileReward";
    events: IRedeemProfileRequestEvent[];
}
export interface IRedeemProfileRequestEvent {
    MessageId: string;
    EventId: string;
}
