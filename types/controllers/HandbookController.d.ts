import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
export declare class HandbookController {
    protected databaseServer: DatabaseServer;
    protected handbookHelper: HandbookHelper;
    constructor(databaseServer: DatabaseServer, handbookHelper: HandbookHelper);
    load(): void;
}
