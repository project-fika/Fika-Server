import type { DependencyContainer } from "tsyringe";
export interface IPostSptLoadModAsync {
    postSptLoadAsync(container: DependencyContainer): Promise<void>;
}
