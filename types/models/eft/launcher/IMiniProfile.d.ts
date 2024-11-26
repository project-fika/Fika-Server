import { ISpt } from "../profile/ISptProfile";
export interface IMiniProfile {
    username: string;
    nickname: string;
    side: string;
    currlvl: number;
    currexp: number;
    prevexp: number;
    nextlvl: number;
    maxlvl: number;
    edition: string;
    profileId: string;
    sptData: ISpt;
}
