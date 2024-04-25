import { FikaMatchStatus } from "../../../enums/FikaMatchStatus";
import { FikaSide } from "../../../enums/FikaSide";
import { FikaTime } from "../../../enums/FikaTime";

export interface IFikaRaidResponse {
    serverId: string;
    hostUsername: string;
    playerCount: number;
    status: FikaMatchStatus;
    location: string;
    side: FikaSide;
    time: FikaTime;
}

export type IFikaRaidsResponse = IFikaRaidResponse[];
