import { IncomingMessage } from "node:http";
import { DependencyContainer, inject, injectable } from "tsyringe";

import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { HttpRouter } from "@spt/routers/HttpRouter";

import { Override } from "../../di/Override";

// Thanks to DrakiaXYZ for this implementation

@injectable()
export class HttpRouterOverride extends Override {
    constructor(@inject("HttpServerHelper") protected httpServerHelper: HttpServerHelper) {
        super();
    }

    public execute(container: DependencyContainer): void {
        // We need access to the full `req` object, so we need to hijack the getResponse method
        container.afterResolution(
            "HttpRouter",
            (_, result: HttpRouter) => {
                const originalGetResponse = result.getResponse;

                result.getResponse = async (req: IncomingMessage, info: any, sessionID: string): Promise<string> => {
                    let response = (await originalGetResponse.apply(result, [req, info, sessionID])) as string;

                    // if the response contains host, replace host with ours
                    if (req.headers?.host) {
                        response = response.replaceAll(this.httpServerHelper.buildUrl(), req.headers.host);
                    }

                    return response;
                };
            },
            { frequency: "Always" },
        );
    }
}
