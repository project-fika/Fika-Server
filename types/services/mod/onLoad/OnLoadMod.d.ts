import { OnLoad } from "@spt/di/OnLoad";
export declare class OnLoadMod implements OnLoad {
    private onLoadOverride;
    private getRouteOverride;
    constructor(onLoadOverride: () => void, getRouteOverride: () => string);
    onLoad(): Promise<void>;
    getRoute(): string;
}
