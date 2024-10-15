import { EDedicatedStatus } from "../../../../enums/EDedicatedStatus";

export interface IStatusDedicatedResponse {
    sessionId: string;
    status: EDedicatedStatus;
}
