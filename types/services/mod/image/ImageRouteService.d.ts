export declare class ImageRouteService {
    protected routes: Record<string, string>;
    addRoute(urlKey: string, route: string): void;
    getByKey(urlKey: string): string;
    existsByKey(urlKey: string): boolean;
}
