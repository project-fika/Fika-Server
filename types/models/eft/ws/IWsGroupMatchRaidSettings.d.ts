import { IRaidSettings } from "@spt-aki/models/eft/match/IRaidSettings";
import { IWsNotificationEvent } from "@spt-aki/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchRaidSettings extends IWsNotificationEvent {
    raidSettings: IRaidSettings;
}
