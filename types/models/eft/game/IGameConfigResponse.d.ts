export interface IGameConfigResponse {
    aid: number;
    lang: string;
    languages: Record<string, string>;
    ndaFree: boolean;
    taxonomy: number;
    activeProfileId: string;
    backend: Backend;
    useProtobuf: boolean;
    utc_time: number;
    /** Total in game time */
    totalInGame: number;
    reportAvailable: boolean;
    twitchEventMember: boolean;
}
export interface Backend {
    Lobby: string;
    Trading: string;
    Messaging: string;
    Main: string;
    RagFair: string;
}
