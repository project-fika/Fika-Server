import { IGetRaidConfigurationRequestData } from "@spt-aki/models/eft/match/IGetRaidConfigurationRequestData";
import { FikaSide } from "../../../../enums/FikaSide";
import { FikaTime } from "../../../../enums/FikaTime";

export interface IFikaRaidCreateRequestData {
    serverId: string;
    hostUsername: string;
    timestamp: string;
    settings: IGetRaidConfigurationRequestData;
    expectedNumberOfPlayers: number;
    gameVersion: string;
    fikaVersion: string;
    side: FikaSide;
    time: FikaTime;
}
