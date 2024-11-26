import { EFikaSide } from "../../enums/EFikaSide";
import { EFikaTime } from "../../enums/EFikaTime";

export interface IFikaRaidPresence {
    location: string;
    side: EFikaSide;
    time: EFikaTime;
}