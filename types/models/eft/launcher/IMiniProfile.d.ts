export interface IMiniProfile {
    username: string;
    nickname: string;
    side: string;
    currlvl: number;
    currexp: number;
    prevexp: number;
    nextlvl: number;
    maxlvl: number;
    sptData: SPTData;
}
export interface SPTData {
    version: string;
}
