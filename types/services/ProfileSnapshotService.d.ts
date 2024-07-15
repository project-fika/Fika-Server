import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class ProfileSnapshotService {
    protected cloner: ICloner;
    protected storedProfileSnapshots: Record<string, ISptProfile>;
    constructor(cloner: ICloner);
    /**
     * Store a profile into an in-memory object
     * @param sessionID session id - acts as the key
     * @param profile - profile to save
     */
    storeProfileSnapshot(sessionID: string, profile: ISptProfile): void;
    /**
     * Retreve a stored profile
     * @param sessionID key
     * @returns A player profile object
     */
    getProfileSnapshot(sessionID: string): ISptProfile | undefined;
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
