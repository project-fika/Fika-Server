import { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";

import { EFikaMatchStatus } from "../enums/EFikaMatchStatus";
import { EFikaSide } from "../enums/EFikaSide";
import { EFikaTime } from "../enums/EFikaTime";
import { IFikaPlayer } from "./IFikaPlayer";

export interface IFikaMatch {
    ips: string[];
    port: number;
    hostUsername: string;
    timestamp: string;
    fikaVersion: string;
    gameVersion: string;
    raidConfig: IGetRaidConfigurationRequestData;
    locationData: ILocationBase;
    status: EFikaMatchStatus;
    timeout: number;
    players: Map<string, IFikaPlayer>;
    side: EFikaSide;
    time: EFikaTime;
    raidCode: string;
    natPunch: boolean;
    isDedicated: boolean;
    raids: number;
}
