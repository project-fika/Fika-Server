import { FikaSide } from "../../enums/FikaSide";
import { FikaTime } from "../../enums/FikaTime";

export interface IFikaRaidPresence {
    location: string;
    side: FikaSide;
    time: FikaTime;
}