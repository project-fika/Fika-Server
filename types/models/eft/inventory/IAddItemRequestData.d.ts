export interface IAddItemRequestData {
    /** Trader id */
    tid: string;
    items: AddItem[];
}
export interface AddItem {
    count: number;
    sptIsPreset?: boolean;
    item_id: string;
}
