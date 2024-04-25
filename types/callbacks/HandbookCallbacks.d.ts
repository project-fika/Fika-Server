import { HandbookController } from "@spt-aki/controllers/HandbookController";
import { OnLoad } from "@spt-aki/di/OnLoad";
export declare class HandbookCallbacks implements OnLoad {
    protected handbookController: HandbookController;
    constructor(handbookController: HandbookController);
    onLoad(): Promise<void>;
    getRoute(): string;
}
