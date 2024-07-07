import { DependencyContainer } from "tsyringe";
import { ModTypeCheck } from "@spt/loaders/ModTypeCheck";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { IModLoader } from "@spt/models/spt/mod/IModLoader";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LocalisationService } from "@spt/services/LocalisationService";
export declare class PostSptModLoader implements IModLoader {
    protected logger: ILogger;
    protected preSptModLoader: PreSptModLoader;
    protected localisationService: LocalisationService;
    protected modTypeCheck: ModTypeCheck;
    protected container: DependencyContainer;
    constructor(logger: ILogger, preSptModLoader: PreSptModLoader, localisationService: LocalisationService, modTypeCheck: ModTypeCheck);
    getModPath(mod: string): string;
    load(): Promise<void>;
    protected executeModsAsync(): Promise<void>;
}
