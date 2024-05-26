import { inject, injectable } from "tsyringe";

import { HashUtil } from "@spt-aki/utils/HashUtil";

import { IFikaFriendRequests } from "../models/fika/IFikaFriendRequests";
import { FikaFriendRequestsCacheService } from "../services/cache/FikaFriendRequestsCacheService";

@injectable()
export class FikaFriendRequestsHelper {
    constructor(
        @inject("HashUtil") protected hashUtil: HashUtil,
        @inject("FikaFriendRequestsCacheService") protected fikaFriendRequestsCacheService: FikaFriendRequestsCacheService,
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
     * @returns the id of the request
     */
    public addFriendRequest(fromProfileId: string, toProfileId: string): string {
        const foundRequest = this.fikaFriendRequestsCacheService
            .getAllFriendRequests()
            .find(fr => fr.from == fromProfileId && fr.to == toProfileId);
        if (foundRequest) {
            return null;
        }

        const id = this.hashUtil.generate();
        this.fikaFriendRequestsCacheService.storeFriendRequest({
            _id: id,
            from: fromProfileId,
            to: toProfileId,
            date: Math.round(Date.now() / 1000),
        });

        return id;
    }

    /**
     * Removes a friend request
     * @param fromProfileId
     * @param toProfileId
     */
    public removeFriendRequest(fromProfileId: string, toProfileId: string): boolean {
        if (!this.fikaFriendRequestsCacheService.exists(fromProfileId, toProfileId)) {
            return false;
        }

        return this.fikaFriendRequestsCacheService.deleteFriendRequest(fromProfileId, toProfileId);
    }
}
