import { DependencyContainer, inject, injectable } from "tsyringe";

import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { ProfileCallbacks } from "@spt-aki/callbacks/ProfileCallbacks";
import { IMiniProfile } from "@spt-aki/models/eft/launcher/IMiniProfile";

import { Override } from "../../di/Override";

@injectable()
export class ProfileCallbacksOverride extends Override {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution("ProfileCallbacks", (_t, result: ProfileCallbacks) => {
            result.getAllMiniProfiles = () => {
                return this.httpResponseUtil.noBody([] as IMiniProfile[]);
            }
        }, { frequency: "Always" });
    }
}
