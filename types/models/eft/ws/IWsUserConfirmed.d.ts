import { IWsNotificationEvent } from "@spt-aki/models/eft/ws/IWsNotificationEvent";
import { ProfileStatus } from "@spt-aki/models/enums/ProfileStatus";
import { RaidMode } from "@spt-aki/models/enums/RaidMode";
export interface IWsUserConfirmed extends IWsNotificationEvent {
    profileid: string;
    profileToken: string;
    status: ProfileStatus;
    ip: string;
    port: number;
    sid: string;
    version: string;
    location: string;
    raidMode: RaidMode;
    mode: string;
    shortId: string;
    additional_info: any[];
}
