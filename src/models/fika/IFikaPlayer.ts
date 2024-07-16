import { SideType } from "@spt/models/enums/SideType";

export interface IFikaPlayer {
    groupId: string;
    isDead: boolean;
    side: SideType;
}
