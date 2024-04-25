import { DynamicRouter } from "@spt-aki/di/Router";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
export declare class HttpDynamicRouter extends DynamicRouter {
    protected imageRouter: ImageRouter;
    constructor(imageRouter: ImageRouter);
}
