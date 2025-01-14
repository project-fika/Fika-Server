import { EHeadlessStatus } from "../../../../enums/EHeadlessStatus";

export interface IStatusHeadlessResponse {
    sessionId: string;
    status: EHeadlessStatus;
}
