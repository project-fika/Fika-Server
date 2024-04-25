import { DependencyContainer } from "tsyringe";
/**
 * Handle the registration of classes to be used by the Dependency Injection code
 */
export declare class Container {
    static registerPostLoadTypes(container: DependencyContainer, childContainer: DependencyContainer): void;
    static registerTypes(depContainer: DependencyContainer): void;
    static registerListTypes(depContainer: DependencyContainer): void;
    private static registerUtils;
    private static registerRouters;
    private static registerGenerators;
    private static registerHelpers;
    private static registerLoaders;
    private static registerCallbacks;
    private static registerServices;
    private static registerServers;
    private static registerControllers;
}
