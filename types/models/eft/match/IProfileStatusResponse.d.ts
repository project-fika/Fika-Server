import { ISessionStatus } from "@spt/models/eft/match/ISessionStatus";
export interface IProfileStatusResponse {
    maxPveCountExceeded: boolean;
    profiles: ISessionStatus[];
}
