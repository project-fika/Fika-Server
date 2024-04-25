import type { DependencyContainer } from "tsyringe";
export interface IPostDBLoadMod {
    postDBLoad(container: DependencyContainer): void;
}
