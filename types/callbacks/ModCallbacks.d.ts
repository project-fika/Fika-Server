import { OnLoad } from "@spt-aki/di/OnLoad";
import { PostAkiModLoader } from "@spt-aki/loaders/PostAkiModLoader";
import { IHttpConfig } from "@spt-aki/models/spt/config/IHttpConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { HttpFileUtil } from "@spt-aki/utils/HttpFileUtil";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
export declare class ModCallbacks implements OnLoad {
    protected logger: ILogger;
    protected httpResponse: HttpResponseUtil;
    protected httpFileUtil: HttpFileUtil;
    protected postAkiModLoader: PostAkiModLoader;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected httpConfig: IHttpConfig;
    constructor(logger: ILogger, httpResponse: HttpResponseUtil, httpFileUtil: HttpFileUtil, postAkiModLoader: PostAkiModLoader, localisationService: LocalisationService, configServer: ConfigServer);
    onLoad(): Promise<void>;
    getRoute(): string;
}
