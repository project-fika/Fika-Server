import { EFikaPlayerPresences } from "../../enums/EFikaPlayerPresences";
import { IFikaRaidPresence } from "./IFikaRaidPresence";

export interface IFikaSetPresence{
    activity: EFikaPlayerPresences;
    raidInformation?: IFikaRaidPresence;
}