import { IPostRaidPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { ISyncHealthRequestData } from "@spt-aki/models/eft/health/ISyncHealthRequestData";
import { IInsuredItemsData } from "@spt-aki/models/eft/inRaid/IInsuredItemsData";
import { PlayerRaidEndState } from "@spt-aki/models/enums/PlayerRaidEndState";
export interface ISaveProgressRequestData {
    exit: PlayerRaidEndState;
    profile: IPostRaidPmcData;
    isPlayerScav: boolean;
    health: ISyncHealthRequestData;
    insurance: IInsuredItemsData[];
}
