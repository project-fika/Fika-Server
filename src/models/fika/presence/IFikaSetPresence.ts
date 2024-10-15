import { FikaPlayerPresences } from "../../enums/FikaPlayerPresences";
import { IFikaRaidPresence } from "./IFikaRaidPresence";

export interface IFikaSetPresence {
    activity: FikaPlayerPresences;
    raidInformation: IFikaRaidPresence;
}