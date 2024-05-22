import type { DependencyContainer } from "tsyringe";
export interface IPostSptLoadMod {
    postSptLoad(container: DependencyContainer): void;
}
