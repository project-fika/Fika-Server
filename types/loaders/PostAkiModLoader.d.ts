import { DependencyContainer } from "tsyringe";
import { ModTypeCheck } from "@spt-aki/loaders/ModTypeCheck";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { IModLoader } from "@spt-aki/models/spt/mod/IModLoader";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
export declare class PostAkiModLoader implements IModLoader {
    protected logger: ILogger;
    protected preAkiModLoader: PreAkiModLoader;
    protected localisationService: LocalisationService;
    protected modTypeCheck: ModTypeCheck;
    protected container: DependencyContainer;
    constructor(logger: ILogger, preAkiModLoader: PreAkiModLoader, localisationService: LocalisationService, modTypeCheck: ModTypeCheck);
    getModPath(mod: string): string;
    load(): Promise<void>;
    protected executeModsAsync(): Promise<void>;
}
