import { DedicatedStatus } from "../../../../enums/DedicatedStatus";

export interface IStatusDedicatedRequest {
    sessionId: string;
    status: DedicatedStatus;
}
