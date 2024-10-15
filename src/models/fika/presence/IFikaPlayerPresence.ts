import { FikaPlayerPresences } from "../../enums/FikaPlayerPresences";
import { IFikaRaidPresence } from "./IFikaRaidPresence";

export interface IFikaPlayerPresence {
    nickname: string;
    level: number;
    activity: FikaPlayerPresences;
    activityStartedTimestamp: number;
    raidInformation: IFikaRaidPresence;
}