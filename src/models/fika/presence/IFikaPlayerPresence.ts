import { EFikaPlayerPresences } from "../../enums/EFikaPlayerPresences";
import { IFikaRaidPresence } from "./IFikaRaidPresence";

export interface IFikaPlayerPresence {
    nickname: string;
    level: number;
    activity: EFikaPlayerPresences;
    activityStartedTimestamp: number;
    raidInformation?: IFikaRaidPresence;
}