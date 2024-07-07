import { DynamicRouter } from "@spt/di/Router";
import { ImageRouter } from "@spt/routers/ImageRouter";
export declare class HttpDynamicRouter extends DynamicRouter {
    protected imageRouter: ImageRouter;
    constructor(imageRouter: ImageRouter);
}
