import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { EFikaSide } from "../../../../enums/EFikaSide";
import { EFikaTime } from "../../../../enums/EFikaTime";

export interface IFikaRaidCreateRequestData {
    raidCode: string;
    serverId: string;
    hostUsername: string;
    timestamp: string;
    settings: IGetRaidConfigurationRequestData;
    gameVersion: string;
    crc32: number;
    side: EFikaSide;
    time: EFikaTime;
    isSpectator: boolean;
}
