import { inject, injectable } from "tsyringe";

import { HashUtil } from "@spt/utils/HashUtil";

import { IFikaFriendRequests } from "../models/fika/IFikaFriendRequests";
import { FikaFriendRequestsCacheService } from "../services/cache/FikaFriendRequestsCacheService";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { SaveServer } from "@spt/servers/SaveServer";
import { SptWebSocketConnectionHandler } from "@spt/servers/ws/SptWebSocketConnectionHandler";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";

@injectable()
export class FikaFriendRequestsHelper {
    constructor(
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("FikaFriendRequestsCacheService") protected fikaFriendRequestsCacheService: FikaFriendRequestsCacheService,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("SptWebSocketConnectionHandler") protected webSocketHandler: SptWebSocketConnectionHandler,
        @inject("WinstonLogger") protected logger: ILogger,
    ) {
        // empty
    }

    /**
     * Returns the friend requests that were sent to the given player
     * @param profileId
     * @returns
     */
    public getReceivedFriendRequests(profileId: string): IFikaFriendRequests[] {
        return this.fikaFriendRequestsCacheService.getReceivedFriendRequests(profileId);
    }

    /**
     * Returns the friend requests that were sent by the given player
     * @param profileId
     * @returns
     */
    public getSentFriendRequests(profileId: string): IFikaFriendRequests[] {
        return this.fikaFriendRequestsCacheService.getSentFriendRequests(profileId);
    }

    /**
     * Adds a friend request
     * @param fromProfileId
     * @param toProfileId
     */
    public addFriendRequest(fromProfileId: string, toProfileId: string): void {
        if (this.fikaFriendRequestsCacheService.exists(fromProfileId, toProfileId)) {
            this.logger.logWithColor(`Friend request ${fromProfileId}->${toProfileId} already exists`, LogTextColor.YELLOW);

            return;
        }

        if (!this.saveServer.profileExists(toProfileId)) {
            this.logger.logWithColor(`Friend request: ${toProfileId} doesn't exist! ${fromProfileId} tried to add an invalid user!`, LogTextColor.YELLOW);

            return;
        }

        this.fikaFriendRequestsCacheService.storeFriendRequest({
            _id: this.hashUtil.generate(),
            from: fromProfileId,
            to: toProfileId,
            date: Math.round(Date.now() / 1000),
        });

        let profile: ISptProfile = this.saveServer.getProfile(fromProfileId);
        if (profile) {
            this.logger.logWithColor(`Sending WebSocket message to ${toProfileId}`, LogTextColor.GREEN);

            this.webSocketHandler.sendMessage(toProfileId, {
                type: "friendListNewRequest",
                eventId: "friendListNewRequest",
                _id: fromProfileId,
                profile: {
                    _id: profile.info.id,
                    aid: profile.info.aid,
                    Info: {
                        Nickname: profile.characters.pmc.Info.Nickname,
                        Side: profile.characters.pmc.Info.Side,
                        Level: profile.characters.pmc.Info.Level,
                        MemberCategory: profile.characters.pmc.Info.MemberCategory,
                        SelectedMemberCategory: profile.characters.pmc.Info.MemberCategory,
                        Ignored: false,
                        Banned: profile.characters.pmc.Info.BannedState,
                    },
                },
            } as any);
        } else {
            this.logger.logWithColor(`Could not find profile for ${fromProfileId}`, LogTextColor.RED);
        }
    }

    /**
     * Removes a friend request
     * @param fromProfileId
     * @param toProfileId
     */
    public removeFriendRequest(fromProfileId: string, toProfileId: string, reason: string): void {
        if (!this.fikaFriendRequestsCacheService.exists(fromProfileId, toProfileId)) {
            this.logger.warning(`Friend request ${fromProfileId}->${toProfileId} doesn't exist`);

            return;
        }

        this.logger.info(`reason (${reason}), fromProfileId (${fromProfileId}), toProfileId (${toProfileId})`);
        this.fikaFriendRequestsCacheService.deleteFriendRequest(fromProfileId, toProfileId);
        switch (reason) {
            case "accept": {
                const profile = this.saveServer.getProfile(toProfileId);
                this.webSocketHandler.sendMessage(fromProfileId, {
                    type: "friendListRequestAccept",
                    eventId: "friendListRequestAccept",
                    profile: {
                        _id: profile.info.id,
                        aid: profile.info.aid,
                        Info: {
                            Nickname: profile.characters.pmc.Info.Nickname,
                            Side: profile.characters.pmc.Info.Side,
                            Level: profile.characters.pmc.Info.Level,
                            MemberCategory: profile.characters.pmc.Info.MemberCategory,
                            SelectedMemberCategory: profile.characters.pmc.Info.MemberCategory,
                            Ignored: false,
                            Banned: profile.characters.pmc.Info.BannedState,
                        },
                    },
                } as any);

                break;
            }
            case "cancel": {
                const profile = this.saveServer.getProfile(fromProfileId);
                this.webSocketHandler.sendMessage(toProfileId, {
                    type: "friendListRequestCancel",
                    eventId: "friendListRequestCancel",
                    profile: {
                        _id: profile.info.id,
                        aid: profile.info.aid,
                        Info: {
                            Nickname: profile.characters.pmc.Info.Nickname,
                            Side: profile.characters.pmc.Info.Side,
                            Level: profile.characters.pmc.Info.Level,
                            MemberCategory: profile.characters.pmc.Info.MemberCategory,
                            SelectedMemberCategory: profile.characters.pmc.Info.MemberCategory,
                            Ignored: false,
                            Banned: profile.characters.pmc.Info.BannedState,
                        },
                    },
                } as any);

                break;
            }
            case "decline": {
                const profile = this.saveServer.getProfile(toProfileId);
                this.webSocketHandler.sendMessage(fromProfileId, {
                    type: "friendListRequestDecline",
                    eventId: "friendListRequestDecline",
                    profile: {
                        _id: profile.info.id,
                        aid: profile.info.aid,
                        Info: {
                            Nickname: profile.characters.pmc.Info.Nickname,
                            Side: profile.characters.pmc.Info.Side,
                            Level: profile.characters.pmc.Info.Level,
                            MemberCategory: profile.characters.pmc.Info.MemberCategory,
                            SelectedMemberCategory: profile.characters.pmc.Info.MemberCategory,
                            Ignored: false,
                            Banned: profile.characters.pmc.Info.BannedState,
                        },
                    },
                } as any);

                break;
            }
        }
    }
}
