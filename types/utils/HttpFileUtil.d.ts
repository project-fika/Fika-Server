import { ServerResponse } from "node:http";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
export declare class HttpFileUtil {
    protected httpServerHelper: HttpServerHelper;
    constructor(httpServerHelper: HttpServerHelper);
    sendFileAsync(resp: ServerResponse, filePath: string): Promise<void>;
}
