import { DependencyContainer, Lifecycle } from "tsyringe";

import { FikaConfig } from "../utils/FikaConfig";

import { ProfileCallbacksOverride } from "../overrides/callbacks/ProfileCallbacks";
import { LocationCallbacksOverride } from "../overrides/callbacks/LocationCallbacks";
import { HttpRouterOverride } from "../overrides/routers/HttpRouter";
import { TradeHelperOverride } from "../overrides/helpers/TradeHelper";
import { LauncherBackgroundOverride } from "../overrides/other/LauncherBackground";
import { LocalesOverride } from "../overrides/other/Locales";
import { Overrider } from "../overrides/Overrider";

import { FikaMatchService } from "../services/FikaMatchService";

import { FikaClientController } from "../controllers/FikaClientController";
import { FikaLocationController } from "../controllers/FikaLocationController";
import { FikaRaidController } from "../controllers/FikaRaidController";
import { FikaSendItemController } from "../controllers/FikaSendItemController";
import { FikaUpdateController } from "../controllers/FikaUpdateController";

import { FikaClientCallbacks } from "../callbacks/FikaClientCallbacks";
import { FikaLocationCallbacks } from "../callbacks/FikaLocationCallbacks";
import { FikaRaidCallbacks } from "../callbacks/FikaRaidCallbacks";
import { FikaSendItemCallbacks } from "../callbacks/FikaSendItemCallbacks";
import { FikaUpdateCallbacks } from "../callbacks/FikaUpdateCallbacks";

import { FikaClientStaticRouter } from "../routers/static/FikaClientStaticRouter";
import { FikaLocationStaticRouter } from "../routers/static/FikaLocationStaticRouter";
import { FikaRaidStaticRouter } from "../routers/static/FikaRaidStaticRouter";
import { FikaSendItemStaticRouter } from "../routers/static/FikaSendItemStaticRouter";
import { FikaUpdateStaticRouter } from "../routers/static/FikaUpdateStaticRouter";

import { FikaItemEventRouter } from "../routers/item_events/FikaItemEventRouter";

import { Fika } from "../Fika";

export class Container {
    public static register(container: DependencyContainer): void {
        this.registerUtils(container);

        this.registerOverrides(container);

        this.registerServices(container);

        this.registerControllers(container);

        this.registerCallbacks(container);

        this.registerRouters(container);

        this.registerListTypes(container);

        container.register<Fika>("Fika", Fika, { lifecycle: Lifecycle.Singleton });
    }

    private static registerListTypes(container: DependencyContainer): void {
        container.registerType("Overrides", "ProfileCallbacksOverride");
        container.registerType("Overrides", "LocationCallbacksOverride");
        container.registerType("Overrides", "HttpRouterOverride");
        container.registerType("Overrides", "TradeHelperOverride");
        container.registerType("Overrides", "LauncherBackgroundOverride");
        container.registerType("Overrides", "LocalesOverride");

        container.registerType("StaticRoutes", "FikaClientStaticRouter");
        container.registerType("StaticRoutes", "FikaLocationStaticRouter");
        container.registerType("StaticRoutes", "FikaRaidStaticRouter");
        container.registerType("StaticRoutes", "FikaSendItemStaticRouter");
        container.registerType("StaticRoutes", "FikaUpdateStaticRouter");

        container.registerType("IERouters", "FikaItemEventRouter");
    }

    private static registerUtils(container: DependencyContainer): void {
        container.register<FikaConfig>("FikaConfig", FikaConfig, { lifecycle: Lifecycle.Singleton });
    }

    private static registerOverrides(container: DependencyContainer): void {
        container.register<ProfileCallbacksOverride>("ProfileCallbacksOverride", ProfileCallbacksOverride, { lifecycle: Lifecycle.Singleton });
        container.register<LocationCallbacksOverride>("LocationCallbacksOverride", LocationCallbacksOverride, { lifecycle: Lifecycle.Singleton });
        container.register<HttpRouterOverride>("HttpRouterOverride", HttpRouterOverride, { lifecycle: Lifecycle.Singleton });
        container.register<TradeHelperOverride>("TradeHelperOverride", TradeHelperOverride, { lifecycle: Lifecycle.Singleton });
        container.register<LauncherBackgroundOverride>("LauncherBackgroundOverride", LauncherBackgroundOverride, { lifecycle: Lifecycle.Singleton });
        container.register<LocalesOverride>("LocalesOverride", LocalesOverride, { lifecycle: Lifecycle.Singleton });
        container.register<Overrider>("Overrider", Overrider, { lifecycle: Lifecycle.Singleton });
    }

    private static registerServices(container: DependencyContainer): void {
        container.register<FikaMatchService>("FikaMatchService", FikaMatchService, { lifecycle: Lifecycle.Singleton });
    }

    private static registerControllers(container: DependencyContainer): void {
        container.register<FikaClientController>("FikaClientController", { useClass: FikaClientController });
        container.register<FikaLocationController>("FikaLocationController", { useClass: FikaLocationController });
        container.register<FikaRaidController>("FikaRaidController", { useClass: FikaRaidController });
        container.register<FikaSendItemController>("FikaSendItemController", { useClass: FikaSendItemController });
        container.register<FikaUpdateController>("FikaUpdateController", { useClass: FikaUpdateController });
    }

    private static registerCallbacks(container: DependencyContainer): void {
        container.register<FikaClientCallbacks>("FikaClientCallbacks", { useClass: FikaClientCallbacks });
        container.register<FikaLocationCallbacks>("FikaLocationCallbacks", { useClass: FikaLocationCallbacks });
        container.register<FikaRaidCallbacks>("FikaRaidCallbacks", { useClass: FikaRaidCallbacks });
        container.register<FikaSendItemCallbacks>("FikaSendItemCallbacks", { useClass: FikaSendItemCallbacks });
        container.register<FikaUpdateCallbacks>("FikaUpdateCallbacks", { useClass: FikaUpdateCallbacks });
    }

    private static registerRouters(container: DependencyContainer): void {
        container.register<FikaClientStaticRouter>("FikaClientStaticRouter", { useClass: FikaClientStaticRouter });
        container.register<FikaLocationStaticRouter>("FikaLocationStaticRouter", { useClass: FikaLocationStaticRouter });
        container.register<FikaRaidStaticRouter>("FikaRaidStaticRouter", { useClass: FikaRaidStaticRouter });
        container.register<FikaSendItemStaticRouter>("FikaSendItemStaticRouter", { useClass: FikaSendItemStaticRouter });
        container.register<FikaUpdateStaticRouter>("FikaUpdateStaticRouter", { useClass: FikaUpdateStaticRouter });

        container.register<FikaItemEventRouter>("FikaItemEventRouter", { useClass: FikaItemEventRouter });
    }
}
