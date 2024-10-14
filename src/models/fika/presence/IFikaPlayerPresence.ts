import { IFikaRaidPresence } from "./IFikaRaidPresence";

export interface IFikaPlayerPresence {
    nickname: string;
    level: number;
    inRaid: boolean;
    raidInformation: IFikaRaidPresence;
}