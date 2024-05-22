import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { IPostDBLoadModAsync } from "@spt/models/external/IPostDBLoadModAsync";
import { IPostSptLoadMod } from "@spt/models/external/IPostSptLoadMod";
import { IPostSptLoadModAsync } from "@spt/models/external/IPostSptLoadModAsync";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IPreSptLoadModAsync } from "@spt/models/external/IPreSptLoadModAsync";
export declare class ModTypeCheck {
    /**
     * Use defined safe guard to check if the mod is a IPreSptLoadMod
     * @returns boolean
     */
    isPreSptLoad(mod: any): mod is IPreSptLoadMod;
    /**
     * Use defined safe guard to check if the mod is a IPostSptLoadMod
     * @returns boolean
     */
    isPostSptLoad(mod: any): mod is IPostSptLoadMod;
    /**
     * Use defined safe guard to check if the mod is a IPostDBLoadMod
     * @returns boolean
     */
    isPostDBLoad(mod: any): mod is IPostDBLoadMod;
    /**
     * Use defined safe guard to check if the mod is a IPreSptLoadModAsync
     * @returns boolean
     */
    isPreSptLoadAsync(mod: any): mod is IPreSptLoadModAsync;
    /**
     * Use defined safe guard to check if the mod is a IPostSptLoadModAsync
     * @returns boolean
     */
    isPostSptLoadAsync(mod: any): mod is IPostSptLoadModAsync;
    /**
     * Use defined safe guard to check if the mod is a IPostDBLoadModAsync
     * @returns boolean
     */
    isPostDBLoadAsync(mod: any): mod is IPostDBLoadModAsync;
    /**
     * Checks for mod to be compatible with 3.X+
     * @returns boolean
     */
    isPostV3Compatible(mod: any): boolean;
}
