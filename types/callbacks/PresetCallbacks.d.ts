import { PresetController } from "@spt-aki/controllers/PresetController";
import { OnLoad } from "@spt-aki/di/OnLoad";
export declare class PresetCallbacks implements OnLoad {
    protected presetController: PresetController;
    constructor(presetController: PresetController);
    onLoad(): Promise<void>;
    getRoute(): string;
}
