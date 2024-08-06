import { DedicatedStatus } from "../routes/raid/dedicated/DedicatedStatus";

export interface IDedicatedClientInfo {
    state: DedicatedStatus;
    lastPing: number;
}
