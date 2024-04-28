export declare enum ESessionMode {
    REGULAR = "regular",
    PVE = "pve"
}
export interface IGameModeResponse {
    gameMode: ESessionMode;
    backendUrl: string;
}
