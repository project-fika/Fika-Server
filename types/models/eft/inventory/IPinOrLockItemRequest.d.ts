import { PinLockState } from "../common/tables/IItem";
export interface IPinOrLockItemRequest {
    Action: "PinLock";
    /** Id of item being pinned */
    Item: string;
    /** "Pinned"/"Locked"/"Free" */
    State: PinLockState;
}
