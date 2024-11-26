import { EDedicatedStatus } from "../../enums/EDedicatedStatus";

export interface IDedicatedClientInfo {
    state: EDedicatedStatus;
    lastPing: number;
}
