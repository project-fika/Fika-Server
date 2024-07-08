import { DependencyContainer, injectable } from "tsyringe";
import { Override } from "../../di/Override";
import { HashUtil } from "@spt/utils/HashUtil";
import { mongoid } from "mongoid-js"

@injectable()
export class HashUtilOverride extends Override {
    constructor(
    ) {
        super();
    }

    public execute(container: DependencyContainer): void {
        container.afterResolution(
            "HashUtil",
            (_t, result: HashUtil) => {
                result.generate = (): string => {
                    return mongoid();
                };
            },
            { frequency: "Always" },
        );
    }
}
