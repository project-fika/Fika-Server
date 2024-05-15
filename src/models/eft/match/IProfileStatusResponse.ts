import { ISessionStatus } from "./ISessionStatus";

export interface IProfileStatusResponse {
    maxPveCountExceeded: boolean;
    profiles: ISessionStatus[];
}
