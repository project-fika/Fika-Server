export interface IHideoutImproveAreaRequestData {
    Action: "HideoutImproveArea";
    /** Hideout area id from areas.json */
    id: string;
    areaType: number;
    items: HideoutItem[];
    timestamp: number;
}
export interface HideoutItem {
    /** Hideout inventory id that was used by improvement action */
    id: string;
    count: number;
}
