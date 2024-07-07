import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { FikaSide } from "../../../../enums/FikaSide";
import { FikaTime } from "../../../../enums/FikaTime";

export interface IFikaRaidCreateRequestData {
    raidCode: string;
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
