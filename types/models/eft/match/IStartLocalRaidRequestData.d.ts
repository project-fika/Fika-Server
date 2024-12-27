import type { ITransition } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import type { TransitionType } from "@spt/models/enums/TransitionType";
export interface IStartLocalRaidRequestData {
    serverId: string;
    location: string;
    timeVariant: string;
    mode: string;
    playerSide: string;
    transitionType: TransitionType;
    transition: ITransition;
    /** Should loot generation be skipped, default false */
    sptSkipLootGeneration?: boolean;
}
