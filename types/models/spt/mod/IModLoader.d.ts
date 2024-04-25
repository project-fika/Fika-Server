import { DependencyContainer } from "tsyringe";
export interface IModLoader {
    load(container: DependencyContainer): void;
    getModPath(mod: string): string;
}
