export interface IHandleQTEEventRequestData {
    Action: string;
    /** true if QTE was successful, otherwise false */
    results: boolean[];
    /** Id of the QTE object used from db/hideout/qte.json */
    id: string;
    timestamp: number;
}
