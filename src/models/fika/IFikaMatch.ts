import { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";

import { FikaMatchStatus } from "../enums/FikaMatchStatus";
import { FikaSide } from "../enums/FikaSide";
import { FikaTime } from "../enums/FikaTime";
import { IFikaPlayer } from "./IFikaPlayer";

export interface IFikaMatch {
    ips: string[];
    port: number;
    hostUsername: string;
    timestamp: string;
    expectedNumberOfPlayers: number;
    fikaVersion: string;
    gameVersion: string;
    raidConfig: IGetRaidConfigurationRequestData;
    locationData: ILocationBase;
    status: FikaMatchStatus;
    spawnPoint: string;
    timeout: number;
    players: Map<string, IFikaPlayer>;
    side: FikaSide;
    time: FikaTime;
    raidCode: string;
    natPunch: boolean;
}
