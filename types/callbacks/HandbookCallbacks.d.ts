import { HandbookController } from "@spt/controllers/HandbookController";
import type { OnLoad } from "@spt/di/OnLoad";
export declare class HandbookCallbacks implements OnLoad {
    protected handbookController: HandbookController;
    constructor(handbookController: HandbookController);
    onLoad(): Promise<void>;
    getRoute(): string;
}
