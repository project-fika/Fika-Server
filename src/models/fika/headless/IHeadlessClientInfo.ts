import { EHeadlessStatus } from "../../enums/EHeadlessStatus";

export interface IHeadlessClientInfo {
    state: EHeadlessStatus;
    lastPing: number;
}
