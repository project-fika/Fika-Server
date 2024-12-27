import { PresetController } from "@spt/controllers/PresetController";
import type { OnLoad } from "@spt/di/OnLoad";
export declare class PresetCallbacks implements OnLoad {
    protected presetController: PresetController;
    constructor(presetController: PresetController);
    onLoad(): Promise<void>;
    getRoute(): string;
}
