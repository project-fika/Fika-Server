import { EHeadlessStatus } from "../../../../enums/EHeadlessStatus";

export interface IStatusHeadlessRequest {
    sessionId: string;
    status: EHeadlessStatus;
}
