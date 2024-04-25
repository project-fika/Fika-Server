export interface IBuyClothingRequestData {
    Action: "CustomizationBuy";
    offer: string;
    items: ClothingItem[];
}
export interface ClothingItem {
    del: boolean;
    id: string;
    count: number;
}
