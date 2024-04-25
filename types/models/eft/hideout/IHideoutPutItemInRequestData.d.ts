export interface IHideoutPutItemInRequestData {
    Action: "HideoutPutItemsInAreaSlots";
    areaType: number;
    items: Record<string, ItemDetails>;
    timestamp: number;
}
export interface ItemDetails {
    count: number;
    id: string;
}
