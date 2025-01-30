export interface IFikaConfigHeadless {
    profiles: {
        amount: number;
    };
    scripts: {
        generate: boolean;
        forceIp: string;
    };
    /** If this is true, sets the headless's average level to that of the entire lobby, if set to false it will take the level of the requester. */
    setLevelToAverageOfLobby: boolean;
}
