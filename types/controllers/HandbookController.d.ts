import { HandbookHelper } from "@spt-aki/helpers/HandbookHelper";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
export declare class HandbookController {
    protected databaseServer: DatabaseServer;
    protected handbookHelper: HandbookHelper;
    constructor(databaseServer: DatabaseServer, handbookHelper: HandbookHelper);
    load(): void;
}
