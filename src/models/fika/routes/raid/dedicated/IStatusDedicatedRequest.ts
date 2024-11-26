import { EDedicatedStatus } from "../../../../enums/EDedicatedStatus";

export interface IStatusDedicatedRequest {
    sessionId: string;
    status: EDedicatedStatus;
}
