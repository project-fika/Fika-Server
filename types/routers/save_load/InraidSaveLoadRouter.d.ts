import { HandledRoute, SaveLoadRouter } from "@spt-aki/di/Router";
import { IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
export declare class InraidSaveLoadRouter extends SaveLoadRouter {
    getHandledRoutes(): HandledRoute[];
    handleLoad(profile: IAkiProfile): IAkiProfile;
}
