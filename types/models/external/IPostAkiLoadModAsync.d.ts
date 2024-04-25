import type { DependencyContainer } from "tsyringe";
export interface IPostAkiLoadModAsync {
    postAkiLoadAsync(container: DependencyContainer): Promise<void>;
}
