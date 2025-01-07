import { OnUpdate } from "@spt/di/OnUpdate";
export declare class OnUpdateMod implements OnUpdate {
    private onUpdateOverride;
    private getRouteOverride;
    constructor(onUpdateOverride: (timeSinceLastRun: number) => boolean, getRouteOverride: () => string);
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    getRoute(): string;
}
