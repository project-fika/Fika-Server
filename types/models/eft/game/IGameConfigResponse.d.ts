export interface IGameConfigResponse {
    aid: number;
    lang: string;
    languages: Record<string, string>;
    ndaFree: boolean;
    taxonomy: number;
    activeProfileId: string;
    backend: IBackend;
    useProtobuf: boolean;
    utc_time: number;
    /** Total in game time */
    totalInGame: number;
    reportAvailable: boolean;
    twitchEventMember: boolean;
    sessionMode: string;
    purchasedGames: IPurchasedGames;
    isGameSynced: boolean;
}
export interface IPurchasedGames {
    eft: boolean;
    arena: boolean;
}
export interface IBackend {
    Lobby: string;
    Trading: string;
    Messaging: string;
    Main: string;
    RagFair: string;
}
