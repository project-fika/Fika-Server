export interface IMiniProfile {
    username: string;
    nickname: string;
    side: string;
    currlvl: number;
    currexp: number;
    prevexp: number;
    nextlvl: number;
    maxlvl: number;
    akiData: AkiData;
}
export interface AkiData {
    version: string;
}
