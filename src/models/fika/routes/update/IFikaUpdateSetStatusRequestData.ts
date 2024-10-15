import { EFikaMatchStatus } from "../../../enums/EFikaMatchStatus";

export interface IFikaUpdateSetStatusRequestData {
    serverId: string;
    status: EFikaMatchStatus;
}
