import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class ProfileSnapshotService {
    protected jsonUtil: JsonUtil;
    protected storedProfileSnapshots: Record<string, IAkiProfile>;
    constructor(jsonUtil: JsonUtil);
    /**
     * Store a profile into an in-memory object
     * @param sessionID session id - acts as the key
     * @param profile - profile to save
     */
    storeProfileSnapshot(sessionID: string, profile: IAkiProfile): void;
    /**
     * Retreve a stored profile
     * @param sessionID key
     * @returns A player profile object
     */
    getProfileSnapshot(sessionID: string): IAkiProfile;
    /**
     * Does a profile exists against the provided key
     * @param sessionID key
     * @returns true if exists
     */
    hasProfileSnapshot(sessionID: string): boolean;
    /**
     * Remove a stored profile by key
     * @param sessionID key
     */
    clearProfileSnapshot(sessionID: string): void;
}
