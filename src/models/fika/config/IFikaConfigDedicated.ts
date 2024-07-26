export interface IFikaConfigDedicated {
    profiles: {
        amount: number;
    }
    scripts: {
        generate: boolean;
        forceIp: string;
    }
}
