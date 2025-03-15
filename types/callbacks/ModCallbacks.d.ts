import { OnLoad } from "@spt/di/OnLoad";
import { PostSptModLoader } from "@spt/loaders/PostSptModLoader";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HttpFileUtil } from "@spt/utils/HttpFileUtil";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
export declare class ModCallbacks implements OnLoad {
    protected logger: ILogger;
    protected httpResponse: HttpResponseUtil;
    protected httpFileUtil: HttpFileUtil;
    protected postSptModLoader: PostSptModLoader;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected httpConfig: IHttpConfig;
    constructor(logger: ILogger, httpResponse: HttpResponseUtil, httpFileUtil: HttpFileUtil, postSptModLoader: PostSptModLoader, localisationService: LocalisationService, configServer: ConfigServer);
    onLoad(): Promise<void>;
    getRoute(): string;
}
