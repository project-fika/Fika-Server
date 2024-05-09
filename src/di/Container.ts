import { DependencyContainer, Lifecycle } from "tsyringe";

import { FikaConfig } from "../utils/FikaConfig";

import { Overrider } from "../overrides/Overrider";
import { DialogueCallbacksOverride } from "../overrides/callbacks/DialogueCallbacks";
import { LocationCallbacksOverride } from "../overrides/callbacks/LocationCallbacks";
import { DialogueControllerOverride } from "../overrides/controllers/DialogueController";
import { ProfileControllerOverride } from "../overrides/controllers/ProfileController";
import { LauncherBackgroundOverride } from "../overrides/other/LauncherBackground";
import { LocalesOverride } from "../overrides/other/Locales";
import { HttpRouterOverride } from "../overrides/routers/HttpRouter";

import { FikaMatchService } from "../services/FikaMatchService";
import { FikaFriendRequestsCacheService } from "../services/cache/FikaFriendRequestsCacheService";
import { FikaPlayerRelationsCacheService } from "../services/cache/FikaPlayerRelationsCacheService";

import { FikaFriendRequestsHelper } from "../helpers/FikaFriendRequestsHelper";
import { FikaPlayerRelationsHelper } from "../helpers/FikaPlayerRelationsHelper";

import { FikaClientController } from "../controllers/FikaClientController";
import { FikaDialogueController } from "../controllers/FikaDialogueController";
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
        Container.registerUtils(container);

        Container.registerOverrides(container);

        Container.registerServices(container);

        Container.registerHelpers(container);

        Container.registerControllers(container);

        Container.registerCallbacks(container);

        Container.registerRouters(container);

        Container.registerListTypes(container);

        container.register<Fika>("Fika", Fika, { lifecycle: Lifecycle.Singleton });
    }

    private static registerListTypes(container: DependencyContainer): void {
        container.registerType("Overrides", "DialogueCallbacksOverride");
        container.registerType("Overrides", "LocationCallbacksOverride");
        container.registerType("Overrides", "DialogueControllerOverride");
        container.registerType("Overrides", "ProfileControllerOverride");
        container.registerType("Overrides", "HttpRouterOverride");
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
        container.register<DialogueCallbacksOverride>("DialogueCallbacksOverride", DialogueCallbacksOverride, { lifecycle: Lifecycle.Singleton });
        container.register<LocationCallbacksOverride>("LocationCallbacksOverride", LocationCallbacksOverride, { lifecycle: Lifecycle.Singleton });
        container.register<DialogueControllerOverride>("DialogueControllerOverride", DialogueControllerOverride, { lifecycle: Lifecycle.Singleton });
        container.register<ProfileControllerOverride>("ProfileControllerOverride", ProfileControllerOverride, { lifecycle: Lifecycle.Singleton });
        container.register<HttpRouterOverride>("HttpRouterOverride", HttpRouterOverride, { lifecycle: Lifecycle.Singleton });
        container.register<LauncherBackgroundOverride>("LauncherBackgroundOverride", LauncherBackgroundOverride, { lifecycle: Lifecycle.Singleton });
        container.register<LocalesOverride>("LocalesOverride", LocalesOverride, { lifecycle: Lifecycle.Singleton });
        container.register<Overrider>("Overrider", Overrider, { lifecycle: Lifecycle.Singleton });
    }

    private static registerServices(container: DependencyContainer): void {
        container.register<FikaMatchService>("FikaMatchService", FikaMatchService, { lifecycle: Lifecycle.Singleton });
        container.register<FikaFriendRequestsCacheService>("FikaFriendRequestsCacheService", FikaFriendRequestsCacheService, { lifecycle: Lifecycle.Singleton });
        container.register<FikaPlayerRelationsCacheService>("FikaPlayerRelationsCacheService", FikaPlayerRelationsCacheService, { lifecycle: Lifecycle.Singleton });
    }

    private static registerHelpers(container: DependencyContainer): void {
        container.register<FikaFriendRequestsHelper>("FikaFriendRequestsHelper", FikaFriendRequestsHelper, { lifecycle: Lifecycle.Singleton });
        container.register<FikaPlayerRelationsHelper>("FikaPlayerRelationsHelper", FikaPlayerRelationsHelper, { lifecycle: Lifecycle.Singleton });
    }

    private static registerControllers(container: DependencyContainer): void {
        container.register<FikaClientController>("FikaClientController", { useClass: FikaClientController });
        container.register<FikaDialogueController>("FikaDialogueController", { useClass: FikaDialogueController });
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
