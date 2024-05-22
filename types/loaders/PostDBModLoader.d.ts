import { DependencyContainer } from "tsyringe";
import { OnLoad } from "@spt/di/OnLoad";
import { BundleLoader } from "@spt/loaders/BundleLoader";
import { ModTypeCheck } from "@spt/loaders/ModTypeCheck";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LocalisationService } from "@spt/services/LocalisationService";
export declare class PostDBModLoader implements OnLoad {
    protected logger: ILogger;
    protected bundleLoader: BundleLoader;
    protected preSptModLoader: PreSptModLoader;
    protected localisationService: LocalisationService;
    protected modTypeCheck: ModTypeCheck;
    protected container: DependencyContainer;
    constructor(logger: ILogger, bundleLoader: BundleLoader, preSptModLoader: PreSptModLoader, localisationService: LocalisationService, modTypeCheck: ModTypeCheck);
    onLoad(): Promise<void>;
    getRoute(): string;
    getModPath(mod: string): string;
    protected executeModsAsync(): Promise<void>;
    protected addBundles(): void;
}
