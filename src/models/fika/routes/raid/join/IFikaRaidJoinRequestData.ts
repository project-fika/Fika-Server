import { SideType } from "@spt/models/enums/SideType";

export interface IFikaRaidJoinRequestData {
    serverId: string;
    profileId: string;
    side: SideType
}
