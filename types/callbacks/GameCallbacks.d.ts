import { GameController } from "@spt-aki/controllers/GameController";
import { OnLoad } from "@spt-aki/di/OnLoad";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { ICheckVersionResponse } from "@spt-aki/models/eft/game/ICheckVersionResponse";
import { ICurrentGroupResponse } from "@spt-aki/models/eft/game/ICurrentGroupResponse";
import { IGameConfigResponse } from "@spt-aki/models/eft/game/IGameConfigResponse";
import { IGameEmptyCrcRequestData } from "@spt-aki/models/eft/game/IGameEmptyCrcRequestData";
import { IGameKeepAliveResponse } from "@spt-aki/models/eft/game/IGameKeepAliveResponse";
import { IGameLogoutResponseData } from "@spt-aki/models/eft/game/IGameLogoutResponseData";
import { IGameStartResponse } from "@spt-aki/models/eft/game/IGameStartResponse";
import { IGetRaidTimeRequest } from "@spt-aki/models/eft/game/IGetRaidTimeRequest";
import { IGetRaidTimeResponse } from "@spt-aki/models/eft/game/IGetRaidTimeResponse";
import { IReportNicknameRequestData } from "@spt-aki/models/eft/game/IReportNicknameRequestData";
import { IServerDetails } from "@spt-aki/models/eft/game/IServerDetails";
import { IVersionValidateRequestData } from "@spt-aki/models/eft/game/IVersionValidateRequestData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { Watermark } from "@spt-aki/utils/Watermark";
export declare class GameCallbacks implements OnLoad {
    protected httpResponse: HttpResponseUtil;
    protected watermark: Watermark;
    protected saveServer: SaveServer;
    protected gameController: GameController;
    constructor(httpResponse: HttpResponseUtil, watermark: Watermark, saveServer: SaveServer, gameController: GameController);
    onLoad(): Promise<void>;
    getRoute(): string;
    /**
     * Handle client/game/version/validate
     * @returns INullResponseData
     */
    versionValidate(url: string, info: IVersionValidateRequestData, sessionID: string): INullResponseData;
    /**
     * Handle client/game/start
     * @returns IGameStartResponse
     */
    gameStart(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGameStartResponse>;
    /**
     * Handle client/game/logout
     * Save profiles on game close
     * @returns IGameLogoutResponseData
     */
    gameLogout(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGameLogoutResponseData>;
    /**
     * Handle client/game/config
     * @returns IGameConfigResponse
     */
    getGameConfig(url: string, info: IGameEmptyCrcRequestData, sessionID: string): IGetBodyResponseData<IGameConfigResponse>;
    /**
     * Handle client/server/list
     */
    getServer(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IServerDetails[]>;
    /**
     * Handle client/match/group/current
     */
    getCurrentGroup(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ICurrentGroupResponse>;
    /**
     * Handle client/checkVersion
     */
    validateGameVersion(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ICheckVersionResponse>;
    /**
     * Handle client/game/keepalive
     * @returns IGameKeepAliveResponse
     */
    gameKeepalive(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IGameKeepAliveResponse>;
    /**
     * Handle singleplayer/settings/version
     * @returns string
     */
    getVersion(url: string, info: IEmptyRequestData, sessionID: string): string;
    reportNickname(url: string, info: IReportNicknameRequestData, sessionID: string): INullResponseData;
    /**
     * Handle singleplayer/settings/getRaidTime
     * @returns string
     */
    getRaidTime(url: string, request: IGetRaidTimeRequest, sessionID: string): IGetRaidTimeResponse;
}
