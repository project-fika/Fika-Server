import { type DependencyContainer } from "tsyringe";
export declare class OnUpdateModService {
    protected container: DependencyContainer;
    constructor(container: DependencyContainer);
    registerOnUpdate(name: string, onUpdate: (timeSinceLastRun: number) => boolean, getRoute: () => string): void;
}
