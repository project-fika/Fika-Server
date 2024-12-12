export interface IFikaConfigClient {
    useBtr: boolean;
    friendlyFire: boolean;
    dynamicVExfils: boolean;
    allowFreeCam: boolean;
    allowSpectateFreeCam: boolean;
    allowItemSending: boolean;
    blacklistedItems: string[],
    forceSaveOnDeath: boolean;
    mods: {
        required: string[];
        optional: string[];
    };
    useInertia: boolean;
    sharedQuestProgression: boolean;
    canEditRaidSettings: boolean;
    enableTransits: boolean;
}
