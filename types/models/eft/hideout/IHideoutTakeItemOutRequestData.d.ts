export interface IHideoutTakeItemOutRequestData {
    Action: "HideoutTakeItemsFromAreaSlots";
    areaType: number;
    slots: number[];
    timestamp: number;
}
