import { DependencyContainer, inject, injectable } from "tsyringe";

import { ProfileController } from "@spt-aki/controllers/ProfileController";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { IMiniProfile } from "@spt-aki/models/eft/launcher/IMiniProfile";
import { IGetOtherProfileRequest } from "@spt-aki/models/eft/profile/IGetOtherProfileRequest";
import { IGetOtherProfileResponse } from "@spt-aki/models/eft/profile/IGetOtherProfileResponse";
import { ISearchFriendRequestData } from "@spt-aki/models/eft/profile/ISearchFriendRequestData";
import { ISearchFriendResponse } from "@spt-aki/models/eft/profile/ISearchFriendResponse";

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
                        if (profile.characters.pmc.Info.Nickname.toLowerCase().startsWith(searchNicknameLowerCase)) {
                            matches.push({
                                _id: profile.characters.pmc._id,
                                aid: profile.characters.pmc.aid,
                                Info: {
                                    Nickname: profile.characters.pmc.Info.Nickname,
                                    Side: profile.characters.pmc.Info.Side,
                                    Level: profile.characters.pmc.Info.Level,
                                    MemberCategory: profile.characters.pmc.Info.MemberCategory,
                                },
                            });
                        }
                    }

                    return matches;
                };

                result.getOtherProfile = (sessionId: string, request: IGetOtherProfileRequest): IGetOtherProfileResponse => {
                    const profiles = this.profileHelper.getProfiles();

                    // default to player profile
                    let profileId = sessionId;

                    for (const profile of Object.values(profiles)) {
                        if (profile.characters.pmc.aid === Number(request.accountId)) {
                            profileId = profile.characters.pmc._id;
                            break;
                        }
                    }

                    const player = this.profileHelper.getFullProfile(profileId);
                    const playerPmc = player.characters.pmc;
                    const playerScav = player.characters.scav;

                    return {
                        id: playerPmc._id,
                        aid: playerPmc.aid,
                        info: {
                            nickname: playerPmc.Info.Nickname,
                            side: playerPmc.Info.Side,
                            experience: playerPmc.Info.Experience,
                            memberCategory: playerPmc.Info.MemberCategory,
                            bannedState: playerPmc.Info.BannedState,
                            bannedUntil: playerPmc.Info.BannedUntil,
                            registrationDate: playerPmc.Info.RegistrationDate,
                        },
                        customization: {
                            head: playerPmc.Customization.Head,
                            body: playerPmc.Customization.Body,
                            feet: playerPmc.Customization.Feet,
                            hands: playerPmc.Customization.Hands,
                        },
                        skills: playerPmc.Skills,
                        equipment: {
                            // Default inventory tpl
                            Id: playerPmc.Inventory.items.find((x) => x._tpl === "55d7217a4bdc2d86028b456d")._id,
                            Items: playerPmc.Inventory.items,
                        },
                        achievements: playerPmc.Achievements,
                        favoriteItems: playerPmc.Inventory.favoriteItems ?? [],
                        pmcStats: {
                            eft: {
                                totalInGameTime: playerPmc.Stats.Eft.TotalInGameTime,
                                overAllCounters: playerPmc.Stats.Eft.OverallCounters,
                            },
                        },
                        scavStats: {
                            eft: {
                                totalInGameTime: playerScav.Stats.Eft.TotalInGameTime,
                                overAllCounters: playerScav.Stats.Eft.OverallCounters,
                            },
                        },
                    };
                };
            },
            { frequency: "Always" },
        );
    }
}
