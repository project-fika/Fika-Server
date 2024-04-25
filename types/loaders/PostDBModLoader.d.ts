import { DependencyContainer } from "tsyringe";
import { OnLoad } from "@spt-aki/di/OnLoad";
import { BundleLoader } from "@spt-aki/loaders/BundleLoader";
import { ModTypeCheck } from "@spt-aki/loaders/ModTypeCheck";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
export declare class PostDBModLoader implements OnLoad {
    protected logger: ILogger;
    protected bundleLoader: BundleLoader;
    protected preAkiModLoader: PreAkiModLoader;
    protected localisationService: LocalisationService;
    protected modTypeCheck: ModTypeCheck;
    protected container: DependencyContainer;
    constructor(logger: ILogger, bundleLoader: BundleLoader, preAkiModLoader: PreAkiModLoader, localisationService: LocalisationService, modTypeCheck: ModTypeCheck);
    onLoad(): Promise<void>;
    getRoute(): string;
    getModPath(mod: string): string;
    protected executeModsAsync(): Promise<void>;
    protected addBundles(): void;
}
