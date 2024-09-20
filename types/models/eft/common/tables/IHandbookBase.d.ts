export interface IHandbookBase {
    Categories: IHandbookCategory[];
    Items: IHandbookItem[];
}
export interface IHandbookCategory {
    Id: string;
    ParentId?: string;
    Icon: string;
    Color: string;
    Order: string;
}
export interface IHandbookItem {
    Id: string;
    ParentId: string;
    Price: number;
}
