import { ISessionStatus } from "@spt-aki/models/eft/match/ISessionStatus";
export interface IProfileStatusResponse {
    maxPveCountExceeded: boolean;
    profiles: ISessionStatus[];
}
