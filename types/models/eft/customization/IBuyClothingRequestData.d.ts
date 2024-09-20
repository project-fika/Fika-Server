export interface IBuyClothingRequestData {
    Action: "CustomizationBuy";
    offer: string;
    items: IPaymentItemForClothing[];
}
export interface IPaymentItemForClothing {
    del: boolean;
    id: string;
    count: number;
}
