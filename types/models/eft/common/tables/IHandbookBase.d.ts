export interface IHandbookBase {
    Categories: Category[];
    Items: HandbookItem[];
}
export interface Category {
    Id: string;
    ParentId?: string;
    Icon: string;
    Color: string;
    Order: string;
}
export interface HandbookItem {
    Id: string;
    ParentId: string;
    Price: number;
}
