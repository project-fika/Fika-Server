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
}
export interface IBackend {
    Lobby: string;
    Trading: string;
    Messaging: string;
    Main: string;
    RagFair: string;
}
