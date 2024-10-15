import { FikaPlayerPresences } from "../../enums/FikaPlayerPresences";
import { IFikaRaidPresence } from "./IFikaRaidPresence";

export interface IFikaPlayerPresence {
    nickname: string;
    level: number;
    activity: FikaPlayerPresences;
    activityStarted: number;
    raidInformation: IFikaRaidPresence;
}