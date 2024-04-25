import { DependencyContainer } from "tsyringe";

export abstract class Override {
    public abstract execute(container: DependencyContainer): void | Promise<void>;
}
