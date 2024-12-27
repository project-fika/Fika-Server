import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IGameConfigResponse } from "@spt/models/eft/game/IGameConfigResponse";
import type { IGameEmptyCrcRequestData } from "@spt/models/eft/game/IGameEmptyCrcRequestData";
import type { IVersionValidateRequestData } from "@spt/models/eft/game/IVersionValidateRequestData";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
export interface IGameCallbacks {
    versionValidate(url: string, info: IVersionValidateRequestData, sessionID: string): INullResponseData;
    gameStart(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    gameLogout(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    getGameConfig(url: string, info: IGameEmptyCrcRequestData, sessionID: string): IGetBodyResponseData<IGameConfigResponse>;
    getServer(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    validateGameVersion(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    gameKeepalive(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<any>;
    getVersion(url: string, info: IEmptyRequestData, sessionID: string): string;
}
