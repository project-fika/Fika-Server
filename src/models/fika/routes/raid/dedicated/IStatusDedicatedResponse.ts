import { DedicatedStatus } from "../../../../enums/DedicatedStatus";

export interface IStatusDedicatedResponse {
    sessionId: string;
    status: DedicatedStatus;
}
