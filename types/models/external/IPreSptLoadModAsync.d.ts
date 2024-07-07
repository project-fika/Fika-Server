import type { DependencyContainer } from "tsyringe";
export interface IPreSptLoadModAsync {
    preSptLoadAsync(container: DependencyContainer): Promise<void>;
}
