import { IWsNotificationEvent } from "@spt/models/eft/ws/IWsNotificationEvent";
export declare class NotificationService {
    protected messageQueue: Record<string, any[]>;
    getMessageQueue(): Record<string, any[]>;
    getMessageFromQueue(sessionId: string): any[];
    updateMessageOnQueue(sessionId: string, value: any[]): void;
    has(sessionID: string): boolean;
    /**
     * Pop first message from queue.
     */
    pop(sessionID: string): any;
    /**
     * Add message to queue
     */
    add(sessionID: string, message: IWsNotificationEvent): void;
    /**
     * Get message queue for session
     * @param sessionID
     */
    get(sessionID: string): any[];
}
