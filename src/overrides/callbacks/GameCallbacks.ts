import { DependencyContainer, inject, injectable } from "tsyringe";

import { GameCallbacks } from "@spt/callbacks/GameCallbacks";
import { NotificationSendHelper } from "@spt/helpers/NotificationSendHelper";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { ICurrentGroupResponse } from "@spt/models/eft/game/ICurrentGroupResponse";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { HashUtil } from "@spt/utils/HashUtil";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { Override } from "../../di/Override";
import { FikaGroupService } from "../../services/FikaGroupService";

@injectable()
export class GameCallbacksOverride extends Override {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaGroupService") protected fikaGroupService: FikaGroupService,
        @inject("NotificationSendHelper") protected notifications: NotificationSendHelper,
        @inject("HashUtil") protected hashUtil: HashUtil,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "GameCallbacks",
            (_t, result: GameCallbacks) => {
                /** client/match/group/current */
                result.getCurrentGroup = (url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ICurrentGroupResponse> => {
                    const groupId = this.fikaGroupService.getGroupIdByMember(sessionID);
                    const group = this.fikaGroupService.getGroup(groupId);

                    return this.httpResponseUtil.getBody({
                        squad: group.map(p => ({
                            _id: p._id,
                            aid: String(p.aid),
                            Info: {
                                Nickname: p.Info.Nickname,
                                Side: p.Info.Side,
                                Level: String(p.Info.Level),
                                MemberCategory: p.Info.MemberCategory
                            },
                            IsLeader: p.IsLeader,
                            IsReady: p.IsReady
                        }))
                    })
                }
            },
            { frequency: "Always" },
        );
    }
}
