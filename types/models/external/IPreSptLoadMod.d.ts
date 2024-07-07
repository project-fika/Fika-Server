import type { DependencyContainer } from "tsyringe";
export interface IPreSptLoadMod {
    preSptLoad(container: DependencyContainer): void;
}
