import type { DependencyContainer } from "tsyringe";
export interface IPreAkiLoadMod {
    preAkiLoad(container: DependencyContainer): void;
}
