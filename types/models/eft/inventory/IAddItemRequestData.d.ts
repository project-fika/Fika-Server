export interface IAddItemRequestData {
    /** Trader id */
    tid: string;
    items: IItemToAdd[];
}
export interface IItemToAdd {
    count: number;
    sptIsPreset?: boolean;
    item_id: string;
}
