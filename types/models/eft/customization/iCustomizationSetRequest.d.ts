export interface ICustomizationSetRequest {
    Action: "CustomizationSet";
    customizations: CustomizationSetOption[];
}
export interface CustomizationSetOption {
    id: string;
    type: string;
    source: string;
}
