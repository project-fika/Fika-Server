import type { DependencyContainer } from "tsyringe";
export interface IPreAkiLoadModAsync {
    preAkiLoadAsync(container: DependencyContainer): Promise<void>;
}
