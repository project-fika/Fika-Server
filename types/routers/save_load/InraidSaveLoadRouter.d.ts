import { HandledRoute, SaveLoadRouter } from "@spt/di/Router";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
export declare class InraidSaveLoadRouter extends SaveLoadRouter {
    getHandledRoutes(): HandledRoute[];
    handleLoad(profile: ISptProfile): ISptProfile;
}
