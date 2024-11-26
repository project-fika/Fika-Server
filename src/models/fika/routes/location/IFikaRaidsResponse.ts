import { EFikaMatchStatus } from "../../../enums/EFikaMatchStatus";
import { EFikaSide } from "../../../enums/EFikaSide";
import { EFikaTime } from "../../../enums/EFikaTime";

export interface IFikaRaidResponse {
    serverId: string;
    hostUsername: string;
    playerCount: number;
    status: EFikaMatchStatus;
    location: string;
    side: EFikaSide;
    time: EFikaTime;
    players: Record<string, boolean>;
}

export type IFikaRaidsResponse = IFikaRaidResponse[];
