import { DedicatedStatus } from "./DedicatedStatus";

export interface IStatusDedicatedRequest {
    sessionId: string;
    status: DedicatedStatus;
}
