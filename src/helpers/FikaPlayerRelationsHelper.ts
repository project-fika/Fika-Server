import { inject, injectable } from "tsyringe";

import { FikaPlayerRelationsCacheService } from "../services/cache/FikaPlayerRelationsCacheService";

@injectable()
export class FikaPlayerRelationsHelper {
    constructor(@inject("FikaPlayerRelationsCacheService") protected fikaPlayerRelationsCacheService: FikaPlayerRelationsCacheService) {
        // empty
    }

    /**
     * Returns the friendlist from the given player
     * @param profileId
     * @returns
     */
    public getFriendsList(profileId: string): string[] {
        return this.fikaPlayerRelationsCacheService.getStoredValue(profileId).Friends;
    }

    /**
     * Returns the ignorelist from the given player
     * @param profileId
     * @returns
     */
    public getIgnoreList(profileId: string): string[] {
        return this.fikaPlayerRelationsCacheService.getStoredValue(profileId).Ignore;
    }

    /**
     * Returns a list of players ignoring the given player
     * @param profileId
     * @returns
     */
    public getInIgnoreList(profileId: string): string[] {
        const storedPlayers = this.fikaPlayerRelationsCacheService.getKeys();

        return storedPlayers.filter((player) => this.fikaPlayerRelationsCacheService.getStoredValue(player).Ignore.includes(profileId));
    }

    /**
     * Makes 2 players fwends :D
     * @param fromProfileId
     * @param toProfileId
     */
    public addFriend(fromProfileId: string, toProfileId: string): void {
        const playerRelations1 = this.fikaPlayerRelationsCacheService.getStoredValue(fromProfileId);

        if (!playerRelations1.Friends.includes(toProfileId)) {
            playerRelations1.Friends.push(toProfileId);
            this.fikaPlayerRelationsCacheService.storeValue(fromProfileId, playerRelations1);
        }

        const playerRelations2 = this.fikaPlayerRelationsCacheService.getStoredValue(toProfileId);

        if (!playerRelations2.Friends.includes(fromProfileId)) {
            playerRelations2.Friends.push(fromProfileId);
            this.fikaPlayerRelationsCacheService.storeValue(toProfileId, playerRelations2);
        }
    }

    /**
     * If the 2 players are fwends, it makes them not fwends :(
     * @param fromProfileId
     * @param toProfileId
     */
    public removeFriend(fromProfileId: string, toProfileId: string): void {
        const playerRelations1 = this.fikaPlayerRelationsCacheService.getStoredValue(fromProfileId);

        if (playerRelations1.Friends.includes(toProfileId)) {
            playerRelations1.Friends.splice(playerRelations1.Friends.indexOf(toProfileId), 1);
            this.fikaPlayerRelationsCacheService.storeValue(fromProfileId, playerRelations1);
        }

        const playerRelations2 = this.fikaPlayerRelationsCacheService.getStoredValue(toProfileId);

        if (playerRelations2.Friends.includes(fromProfileId)) {
            playerRelations2.Friends.splice(playerRelations2.Friends.indexOf(fromProfileId), 1);
            this.fikaPlayerRelationsCacheService.storeValue(toProfileId, playerRelations2);
        }
    }

    /**
     * If player2 is not in player1's ignore list, it adds them
     * @param fromProfileId
     * @param toProfileId
     */
    public addToIgnoreList(fromProfileId: string, toProfileId: string): void {
        const playerRelations = this.fikaPlayerRelationsCacheService.getStoredValue(fromProfileId);

        if (!playerRelations.Ignore.includes(toProfileId)) {
            playerRelations.Ignore.push(toProfileId);
            this.fikaPlayerRelationsCacheService.storeValue(fromProfileId, playerRelations);
        }
    }

    /**
     * If player2 is in player1's ignore list, it removes them
     * @param fromProfileId
     * @param toProfileId
     */
    public removeFromIgnoreList(fromProfileId: string, toProfileId: string): void {
        const playerRelations = this.fikaPlayerRelationsCacheService.getStoredValue(fromProfileId);

        if (playerRelations.Ignore.includes(toProfileId)) {
            playerRelations.Ignore.splice(playerRelations.Ignore.indexOf(toProfileId), 1);
            this.fikaPlayerRelationsCacheService.storeValue(fromProfileId, playerRelations);
        }
    }
}
