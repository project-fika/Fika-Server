import { type DependencyContainer } from "tsyringe";
export declare class OnLoadModService {
    protected container: DependencyContainer;
    constructor(container: DependencyContainer);
    registerOnLoad(name: string, onLoad: () => void, getRoute: () => string): void;
}
