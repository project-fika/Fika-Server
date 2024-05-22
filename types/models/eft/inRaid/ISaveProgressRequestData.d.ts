import { IPostRaidPmcData } from "@spt/models/eft/common/IPmcData";
import { ISyncHealthRequestData } from "@spt/models/eft/health/ISyncHealthRequestData";
import { IInsuredItemsData } from "@spt/models/eft/inRaid/IInsuredItemsData";
import { PlayerRaidEndState } from "@spt/models/enums/PlayerRaidEndState";
export interface ISaveProgressRequestData {
    exit: PlayerRaidEndState;
    profile: IPostRaidPmcData;
    isPlayerScav: boolean;
    health: ISyncHealthRequestData;
    insurance: IInsuredItemsData[];
}
