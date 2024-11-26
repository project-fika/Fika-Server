import { ExitStatus } from "@spt/models/enums/ExitStatis";
import { IPmcData } from "../common/IPmcData";
import { IItem } from "../common/tables/IItem";
export interface IEndLocalRaidRequestData {
    /** ID of server player just left */
    serverId: string;
    results: IEndRaidResult;
    /** Insured items left in raid by player */
    lostInsuredItems: IItem[];
    /** Items sent via traders to player, keyed to service e.g. BTRTransferStash */
    transferItems: Record<string, IItem[]>;
    locationTransit: ILocationTransit;
}
export interface IEndRaidResult {
    profile: IPmcData;
    /** "Survived/Transit" etc */
    result: ExitStatus;
    killerId: string;
    killerAid: string;
    /** "Gate 3" etc */
    exitName: string;
    inSession: boolean;
    favorite: boolean;
    /** Seconds in raid */
    playTime: number;
}
export interface ILocationTransit {
    hash: string;
    playersCount: number;
    ip: string;
    location: string;
    profiles: Record<string, ITransitProfile>;
    transitionRaidId: string;
    raidMode: string;
    side: string;
    dayTime: string;
    /** The location player last visited */
    sptLastVisitedLocation: string;
}
export interface ITransitProfile {
    _id: string;
    keyId: string;
    isSolo: boolean;
}
