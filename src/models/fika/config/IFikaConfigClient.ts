export interface IFikaConfigClient {
    useBtr: boolean;
    friendlyFire: boolean;
    dynamicVExfils: boolean;
    allowFreeCam: boolean;
    allowSpectateFreeCam: boolean;
    blacklistedItems: string[];
    forceSaveOnDeath: boolean;
    mods: {
        required: string[];
        optional: string[];
    };
    useInertia: boolean;
    sharedQuestProgression: boolean;
    canEditRaidSettings: boolean;
    enableTransits: boolean;
    anyoneCanStartRaid: boolean;
}
