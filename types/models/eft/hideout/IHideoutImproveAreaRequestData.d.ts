export interface IHideoutImproveAreaRequestData {
    Action: "HideoutImproveArea";
    /** Hideout area id from areas.json */
    id: string;
    areaType: number;
    items: IHideoutItem[];
    timestamp: number;
}
export interface IHideoutItem {
    /** Hideout inventory id that was used by improvement action */
    id: string;
    count: number;
}
