import { IPreset } from "@spt-aki/models/eft/common/IGlobals";
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ICloner } from "@spt-aki/utils/cloners/ICloner";
import { ItemHelper } from "./ItemHelper";
export declare class PresetHelper {
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected cloner: ICloner;
    protected lookup: Record<string, string[]>;
    protected defaultEquipmentPresets: Record<string, IPreset>;
    protected defaultWeaponPresets: Record<string, IPreset>;
    constructor(databaseServer: DatabaseServer, itemHelper: ItemHelper, cloner: ICloner);
    hydratePresetStore(input: Record<string, string[]>): void;
    /**
     * Get default weapon and equipment presets
     * @returns Dictionary
     */
    getDefaultPresets(): Record<string, IPreset>;
    /**
     * Get default weapon presets
     * @returns Dictionary
     */
    getDefaultWeaponPresets(): Record<string, IPreset>;
    /**
     * Get default equipment presets
     * @returns Dictionary
     */
    getDefaultEquipmentPresets(): Record<string, IPreset>;
    isPreset(id: string): boolean;
    /**
     * Checks to see if the preset is of the given base class.
     * @param id The id of the preset
     * @param baseClass The BaseClasses enum to check against
     * @returns True if the preset is of the given base class, false otherwise
     */
    isPresetBaseClass(id: string, baseClass: BaseClasses): boolean;
    hasPreset(templateId: string): boolean;
    getPreset(id: string): IPreset;
    getAllPresets(): IPreset[];
    getPresets(templateId: string): IPreset[];
    /**
     * Get the default preset for passed in item id
     * @param templateId Item id to get preset for
     * @returns Null if no default preset, otherwise IPreset
     */
    getDefaultPreset(templateId: string): IPreset;
    getBaseItemTpl(presetId: string): string;
    /**
     * Return the price of the preset for the given item tpl, or for the tpl itself if no preset exists
     * @param tpl The item template to get the price of
     * @returns The price of the given item preset, or base item if no preset exists
     */
    getDefaultPresetOrItemPrice(tpl: string): number;
}
