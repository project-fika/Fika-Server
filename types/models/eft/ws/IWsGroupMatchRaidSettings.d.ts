import type { IRaidSettings } from "@spt/models/eft/match/IRaidSettings";
import type { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export interface IWsGroupMatchRaidSettings extends IWsNotificationEvent {
    raidSettings: IRaidSettings;
}
