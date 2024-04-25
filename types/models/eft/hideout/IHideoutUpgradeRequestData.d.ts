export interface IHideoutUpgradeRequestData {
    Action: "HideoutUpgrade";
    areaType: number;
    items: HideoutItem[];
    timestamp: number;
}
export interface HideoutItem {
    count: number;
    id: string;
}
