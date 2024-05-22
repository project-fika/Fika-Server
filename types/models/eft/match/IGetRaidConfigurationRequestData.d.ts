import { IRaidSettings } from "@spt/models/eft/match/IRaidSettings";
export interface IGetRaidConfigurationRequestData extends IRaidSettings {
    keyId: string;
    CanShowGroupPreview: boolean;
    MaxGroupCount: number;
}
