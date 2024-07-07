import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { NotifierHelper } from "@spt/helpers/NotifierHelper";
import { INotifierChannel } from "@spt/models/eft/notifier/INotifier";
import { NotificationService } from "@spt/services/NotificationService";
export declare class NotifierController {
    protected notifierHelper: NotifierHelper;
    protected httpServerHelper: HttpServerHelper;
    protected notificationService: NotificationService;
    protected pollInterval: number;
    protected timeout: number;
    constructor(notifierHelper: NotifierHelper, httpServerHelper: HttpServerHelper, notificationService: NotificationService);
    /**
     * Resolve an array of session notifications.
     *
     * If no notifications are currently queued then intermittently check for new notifications until either
     * one or more appear or when a timeout expires.
     * If no notifications are available after the timeout, use a default message.
     */
    notifyAsync(sessionID: string): Promise<unknown>;
    getServer(sessionID: string): string;
    /** Handle client/notifier/channel/create */
    getChannel(sessionID: string): INotifierChannel;
}
