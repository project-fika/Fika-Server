export interface IAddOfferRequestData {
    Action: string;
    sellInOnePiece: boolean;
    items: string[];
    requirements: IRequirement[];
}
export interface IRequirement {
    _tpl: string;
    count: number;
    level: number;
    side: number;
    onlyFunctional: boolean;
}
