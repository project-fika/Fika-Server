import { DependencyContainer, Lifecycle } from "tsyringe";

import { FikaConfig } from "../utils/FikaConfig";

import { Overrider } from "../overrides/Overrider";
import { DialogueCallbacksOverride } from "../overrides/callbacks/DialogueCallbacks";
import { LocationLifecycleServiceOverride } from "../overrides/services/LocationLifecycleService";
import { AchievementControllerOverride } from "../overrides/controllers/AchievementController";
import { DialogueControllerOverride } from "../overrides/controllers/DialogueController";
import { ProfileControllerOverride } from "../overrides/controllers/ProfileController";
// import { LocalesOverride } from "../overrides/other/Locales";
import { HttpRouterOverride } from "../overrides/routers/HttpRouter";
import { LauncherControllerOverride } from "../overrides/controllers/LauncherController";
import { MatchControllerOverride } from "../overrides/controllers/MatchController";

import { FikaMatchService } from "../services/FikaMatchService";
import { FikaFriendRequestsCacheService } from "../services/cache/FikaFriendRequestsCacheService";
import { FikaPlayerRelationsCacheService } from "../services/cache/FikaPlayerRelationsCacheService";
import { FikaDedicatedRaidService } from "../services/dedicated/FikaDedicatedRaidService";
import { FikaInsuranceService } from "../services/FikaInsuranceService";
import { FikaPresenceService } from "../services/FikaPresenceService";

import { FikaClientModHashesHelper } from "../helpers/FikaClientModHashesHelper";
import { FikaFriendRequestsHelper } from "../helpers/FikaFriendRequestsHelper";
import { FikaPlayerRelationsHelper } from "../helpers/FikaPlayerRelationsHelper";

import { FikaAchievementController } from "../controllers/FikaAchievementController";
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
import { FikaPresenceCallbacks } from "../callbacks/FikaPresenceCallbacks";

import { FikaItemEventRouter } from "../routers/item_events/FikaItemEventRouter";
import { FikaClientStaticRouter } from "../routers/static/FikaClientStaticRouter";
import { FikaLocationStaticRouter } from "../routers/static/FikaLocationStaticRouter";
import { FikaRaidStaticRouter } from "../routers/static/FikaRaidStaticRouter";
import { FikaSendItemStaticRouter } from "../routers/static/FikaSendItemStaticRouter";
import { FikaUpdateStaticRouter } from "../routers/static/FikaUpdateStaticRouter";
import { FikaPresenceStaticRouter } from "../routers/static/FikaPresenceStaticRouter";

import { FikaDedicatedRaidWebSocket } from "../websockets/FikaDedicatedRaidWebSocket";
import { FikaNotificationWebSocket } from "../websockets/FikaNotificationWebSocket";

import { Fika } from "../Fika";
import { FikaDedicatedProfileService } from "../services/dedicated/FikaDedicatedProfileService";
import { FikaServerTools } from "../utils/FikaServerTools";
import { FikaNotificationStaticRouter } from "../routers/static/FikaNotificationStaticRouter";
import { FikaNotificationCallbacks } from "../callbacks/FikaNotificationCallbacks";

export class Container {
    public static register(container: DependencyContainer): void {
        Container.registerUtils(container);

        Container.registerOverrides(container);

        Container.registerServices(container);

        Container.registerHelpers(container);

        Container.registerControllers(container);

        Container.registerCallbacks(container);

        Container.registerRouters(container);

        Container.registerWebSockets(container);

        Container.registerListTypes(container);

        container.register<Fika>("Fika", Fika, { lifecycle: Lifecycle.Singleton });
    }

    private static registerListTypes(container: DependencyContainer): void {
        container.registerType("Overrides", "DialogueCallbacksOverride");
        container.registerType("Overrides", "DialogueControllerOverride");
        container.registerType("Overrides", "ProfileControllerOverride");
        container.registerType("Overrides", "HttpRouterOverride");
        // container.registerType("Overrides", "LocalesOverride");
        container.registerType("Overrides", "AchievementControllerOverride");
        container.registerType("Overrides", "LauncherControllerOverride");
        container.registerType("Overrides", "LocationLifecycleServiceOverride");
        container.registerType("Overrides", "MatchControllerOverride");

        container.registerType("StaticRoutes", "FikaClientStaticRouter");
        container.registerType("StaticRoutes", "FikaLocationStaticRouter");
        container.registerType("StaticRoutes", "FikaRaidStaticRouter");
        container.registerType("StaticRoutes", "FikaSendItemStaticRouter");
        container.registerType("StaticRoutes", "FikaUpdateStaticRouter");
        container.registerType("StaticRoutes", "FikaNotificationStaticRouter");
        container.registerType("StaticRoutes", "FikaPresenceStaticRouter");

        container.registerType("IERouters", "FikaItemEventRouter");

        container.registerType("WebSocketConnectionHandler", "FikaDedicatedRaidWebSocket");
        container.registerType("WebSocketConnectionHandler", "FikaNotificationWebSocket");
    }

    private static registerUtils(container: DependencyContainer): void {
        container.register<FikaConfig>("FikaConfig", FikaConfig, { lifecycle: Lifecycle.Singleton });
        container.register<FikaServerTools>("FikaServerTools", FikaServerTools, { lifecycle: Lifecycle.Singleton });
    }

    private static registerOverrides(container: DependencyContainer): void {
        container.register<DialogueCallbacksOverride>("DialogueCallbacksOverride", DialogueCallbacksOverride, { lifecycle: Lifecycle.Singleton });
        container.register<DialogueControllerOverride>("DialogueControllerOverride", DialogueControllerOverride, { lifecycle: Lifecycle.Singleton });
        container.register<ProfileControllerOverride>("ProfileControllerOverride", ProfileControllerOverride, { lifecycle: Lifecycle.Singleton });
        container.register<HttpRouterOverride>("HttpRouterOverride", HttpRouterOverride, { lifecycle: Lifecycle.Singleton });
        // container.register<LocalesOverride>("LocalesOverride", LocalesOverride, { lifecycle: Lifecycle.Singleton });
        container.register<Overrider>("Overrider", Overrider, { lifecycle: Lifecycle.Singleton });
        container.register<AchievementControllerOverride>("AchievementControllerOverride", AchievementControllerOverride, { lifecycle: Lifecycle.Singleton });
        container.register<LauncherControllerOverride>("LauncherControllerOverride", LauncherControllerOverride, { lifecycle: Lifecycle.Singleton });
        container.register<LocationLifecycleServiceOverride>("LocationLifecycleServiceOverride", LocationLifecycleServiceOverride, { lifecycle: Lifecycle.Singleton });
        container.register<MatchControllerOverride>("MatchControllerOverride", MatchControllerOverride, { lifecycle: Lifecycle.Singleton });
    }

    private static registerServices(container: DependencyContainer): void {
        container.register<FikaMatchService>("FikaMatchService", FikaMatchService, { lifecycle: Lifecycle.Singleton });
        container.register<FikaFriendRequestsCacheService>("FikaFriendRequestsCacheService", FikaFriendRequestsCacheService, { lifecycle: Lifecycle.Singleton });
        container.register<FikaPlayerRelationsCacheService>("FikaPlayerRelationsCacheService", FikaPlayerRelationsCacheService, { lifecycle: Lifecycle.Singleton });
        container.register<FikaDedicatedRaidService>("FikaDedicatedRaidService", FikaDedicatedRaidService, { lifecycle: Lifecycle.Singleton });
        container.register<FikaDedicatedProfileService>("FikaDedicatedProfileService", FikaDedicatedProfileService, { lifecycle: Lifecycle.Singleton });
        container.register<FikaInsuranceService>("FikaInsuranceService", FikaInsuranceService, { lifecycle: Lifecycle.Singleton });
        container.register<FikaPresenceService>("FikaPresenceService", FikaPresenceService, { lifecycle: Lifecycle.Singleton });
    }

    private static registerHelpers(container: DependencyContainer): void {
        container.register<FikaClientModHashesHelper>("FikaClientModHashesHelper", FikaClientModHashesHelper, { lifecycle: Lifecycle.Singleton });
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
        container.register<FikaAchievementController>("FikaAchievementController", { useClass: FikaAchievementController });
    }

    private static registerCallbacks(container: DependencyContainer): void {
        container.register<FikaClientCallbacks>("FikaClientCallbacks", { useClass: FikaClientCallbacks });
        container.register<FikaLocationCallbacks>("FikaLocationCallbacks", { useClass: FikaLocationCallbacks });
        container.register<FikaRaidCallbacks>("FikaRaidCallbacks", { useClass: FikaRaidCallbacks });
        container.register<FikaSendItemCallbacks>("FikaSendItemCallbacks", { useClass: FikaSendItemCallbacks });
        container.register<FikaUpdateCallbacks>("FikaUpdateCallbacks", { useClass: FikaUpdateCallbacks });
        container.register<FikaNotificationCallbacks>("FikaNotificationCallbacks", { useClass: FikaNotificationCallbacks });
        container.register<FikaPresenceCallbacks>("FikaPresenceCallbacks", { useClass: FikaPresenceCallbacks });
    }

    private static registerRouters(container: DependencyContainer): void {
        container.register<FikaClientStaticRouter>("FikaClientStaticRouter", { useClass: FikaClientStaticRouter });
        container.register<FikaLocationStaticRouter>("FikaLocationStaticRouter", { useClass: FikaLocationStaticRouter });
        container.register<FikaRaidStaticRouter>("FikaRaidStaticRouter", { useClass: FikaRaidStaticRouter });
        container.register<FikaSendItemStaticRouter>("FikaSendItemStaticRouter", { useClass: FikaSendItemStaticRouter });
        container.register<FikaUpdateStaticRouter>("FikaUpdateStaticRouter", { useClass: FikaUpdateStaticRouter });
        container.register<FikaItemEventRouter>("FikaItemEventRouter", { useClass: FikaItemEventRouter });
        container.register<FikaNotificationStaticRouter>("FikaNotificationStaticRouter", { useClass: FikaNotificationStaticRouter });
        container.register<FikaPresenceStaticRouter>("FikaPresenceStaticRouter", { useClass: FikaPresenceStaticRouter });
    }

    private static registerWebSockets(container: DependencyContainer): void {
        container.register<FikaDedicatedRaidWebSocket>("FikaDedicatedRaidWebSocket", FikaDedicatedRaidWebSocket, { lifecycle: Lifecycle.Singleton });
        container.register<FikaNotificationWebSocket>("FikaNotificationWebSocket", FikaNotificationWebSocket, { lifecycle: Lifecycle.Singleton });
    }
}
