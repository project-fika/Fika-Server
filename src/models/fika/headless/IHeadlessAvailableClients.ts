export interface IHeadlessAvailableClients {
    /** SessionID of the headless client */
    headlessSessionID: string;
    /** The alias of the headless client, if it has any assigned. If it doesn't have any assigned uses the nickname */
    alias: string;
}
