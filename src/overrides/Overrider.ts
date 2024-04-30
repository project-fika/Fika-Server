import { DependencyContainer, injectAll, injectable } from "tsyringe";

import { Override } from "../di/Override";

@injectable()
export class Overrider {
    constructor(@injectAll("Overrides") protected overrides: Override[]) {
        // empty
    }

    public async override(container: DependencyContainer): Promise<void> {
        for (const override of this.overrides) {
            if (override.execute.constructor.name === "AsyncFunction") {
                await override.execute(container);
            } else {
                override.execute(container);
            }
        }
    }
}
