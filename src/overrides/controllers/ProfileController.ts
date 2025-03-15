import { DependencyContainer, inject, injectable } from "tsyringe";

import { ProfileController } from "@spt/controllers/ProfileController";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IMiniProfile } from "@spt/models/eft/launcher/IMiniProfile";
import { ISearchFriendRequestData } from "@spt/models/eft/profile/ISearchFriendRequestData";
import { ISearchFriendResponse } from "@spt/models/eft/profile/ISearchFriendResponse";

import { Override } from "../../di/Override";
import { FikaConfig } from "../../utils/FikaConfig";

@injectable()
export class ProfileControllerOverride extends Override {
    constructor(
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        const fikaConfig = this.fikaConfig.getConfig();

        container.afterResolution(
            "ProfileController",
            (_t, result: ProfileController) => {
                if (!fikaConfig.server.launcherListAllProfiles) {
                    result.getMiniProfiles = (): IMiniProfile[] => {
                        return [];
                    };
                }

                result.getFriends = (info: ISearchFriendRequestData, _sessionID: string): ISearchFriendResponse[] => {
                    const searchNicknameLowerCase = info.nickname.toLowerCase();

                    const profiles = this.profileHelper.getProfiles();

                    const matches: ISearchFriendResponse[] = [];

                    for (const profile of Object.values(profiles)) {
                        if (profile.info?.password === "fika-headless") continue;

                        if (profile.characters?.pmc?.Info) {
                            if (profile.characters.pmc.Info.Nickname.toLowerCase().startsWith(searchNicknameLowerCase)) {
                                matches.push({
                                    _id: profile.characters.pmc._id,
                                    aid: profile.characters.pmc.aid,
                                    Info: {
                                        Nickname: profile.characters.pmc.Info.Nickname,
                                        Side: profile.characters.pmc.Info.Side,
                                        Level: profile.characters.pmc.Info.Level,
                                        MemberCategory: profile.characters.pmc.Info.MemberCategory,
                                        SelectedMemberCategory: profile.characters.pmc.Info.SelectedMemberCategory,
                                    },
                                });
                            }
                        }
                    }

                    return matches;
                };
            },
            { frequency: "Always" },
        );
    }
}
