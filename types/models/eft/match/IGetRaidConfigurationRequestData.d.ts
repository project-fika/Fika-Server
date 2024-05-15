import { IRaidSettings } from "@spt-aki/models/eft/match/IRaidSettings";
export interface IGetRaidConfigurationRequestData extends IRaidSettings {
    keyId: string;
    CanShowGroupPreview: boolean;
    MaxGroupCount: number;
}
