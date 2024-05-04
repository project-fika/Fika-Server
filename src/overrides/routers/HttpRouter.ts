import { DependencyContainer, inject, injectable } from "tsyringe";

import { IncomingMessage } from "node:http";
import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
import { HttpRouter } from "@spt-aki/routers/HttpRouter";

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

                result.getResponse = (req: IncomingMessage, info: any, sessionID: string): string => {
                    let response = originalGetResponse.apply(result, [req, info, sessionID]);

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
