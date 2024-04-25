import { IInventoryBaseActionRequestData } from "./IInventoryBaseActionRequestData";
export interface IRedeemProfileRequestData extends IInventoryBaseActionRequestData {
    Action: "RedeemProfileReward";
    events: IRedeemProfileRequestEvent[];
}
export interface IRedeemProfileRequestEvent {
    MessageId: string;
    EventId: string;
}
