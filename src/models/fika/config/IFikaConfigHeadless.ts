export interface IFikaConfigHeadless {
    profiles: {
        amount: number;
    };
    scripts: {
        generate: boolean;
        forceIp: string;
    };
}
