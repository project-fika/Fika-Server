import { DedicatedStatus } from "../../enums/DedicatedStatus";

export interface IDedicatedClientInfo {
    state: DedicatedStatus;
    lastPing: number;
}
