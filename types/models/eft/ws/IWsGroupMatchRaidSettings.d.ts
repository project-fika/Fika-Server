import { IRaidSettings } from "@spt/models/eft/match/IRaidSettings";
import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchRaidSettings extends IWsNotificationEvent {
    raidSettings: IRaidSettings;
}
