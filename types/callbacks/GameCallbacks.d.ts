import { GameController } from "@spt/controllers/GameController";
import type { OnLoad } from "@spt/di/OnLoad";
import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IUIDRequestData } from "@spt/models/eft/common/request/IUIDRequestData";
import type { ICheckVersionResponse } from "@spt/models/eft/game/ICheckVersionResponse";
import type { ICurrentGroupResponse } from "@spt/models/eft/game/ICurrentGroupResponse";
import type { IGameConfigResponse } from "@spt/models/eft/game/IGameConfigResponse";
import type { IGameEmptyCrcRequestData } from "@spt/models/eft/game/IGameEmptyCrcRequestData";
import type { IGameKeepAliveResponse } from "@spt/models/eft/game/IGameKeepAliveResponse";
import type { IGameLogoutResponseData } from "@spt/models/eft/game/IGameLogoutResponseData";
import type { IGameModeRequestData } from "@spt/models/eft/game/IGameModeRequestData";
import type { IGameModeResponse } from "@spt/models/eft/game/IGameModeResponse";
import type { IGameStartResponse } from "@spt/models/eft/game/IGameStartResponse";
import type { IGetRaidTimeRequest } from "@spt/models/eft/game/IGetRaidTimeRequest";
import type { IGetRaidTimeResponse } from "@spt/models/eft/game/IGetRaidTimeResponse";
import type { ISendSurveyOpinionRequest } from "@spt/models/eft/game/ISendSurveyOpinionRequest";
import type { IServerDetails } from "@spt/models/eft/game/IServerDetails";
import type { ISurveyResponseData } from "@spt/models/eft/game/ISurveyResponseData";
import type { IVersionValidateRequestData } from "@spt/models/eft/game/IVersionValidateRequestData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { SaveServer } from "@spt/servers/SaveServer";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { Watermark } from "@spt/utils/Watermark";
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
     * Handle client/game/mode
     * @returns IGameModeResponse
     */
    getGameMode(url: string, info: IGameModeRequestData, sessionID: string): IGetBodyResponseData<IGameModeResponse>;
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
    /**
     * Handle /client/report/send & /client/reports/lobby/send
     * @returns INullResponseData
     */
    reportNickname(url: string, info: IUIDRequestData, sessionID: string): INullResponseData;
    /**
     * Handle singleplayer/settings/getRaidTime
     * @returns string
     */
    getRaidTime(url: string, request: IGetRaidTimeRequest, sessionID: string): IGetRaidTimeResponse;
    /**
     * Handle /client/survey
     * @returns INullResponseData
     */
    getSurvey(url: string, request: IEmptyRequestData, sessionId: string): INullResponseData | IGetBodyResponseData<ISurveyResponseData>;
    /**
     * Handle client/survey/view
     * @returns INullResponseData
     */
    getSurveyView(url: string, request: any, sessionId: string): INullResponseData;
    /**
     * Handle client/survey/opinion
     * @returns INullResponseData
     */
    sendSurveyOpinion(url: string, request: ISendSurveyOpinionRequest, sessionId: string): INullResponseData;
}
