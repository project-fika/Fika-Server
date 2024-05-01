import { FikaMatchStatus } from "../../../enums/FikaMatchStatus";

export interface IFikaUpdateSetStatusRequestData {
    serverId: string;
    status: FikaMatchStatus;
}
