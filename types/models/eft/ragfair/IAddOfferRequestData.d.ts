export interface IAddOfferRequestData {
    Action: string;
    sellInOnePiece: boolean;
    items: string[];
    requirements: Requirement[];
}
export interface Requirement {
    _tpl: string;
    count: number;
    level: number;
    side: number;
    onlyFunctional: boolean;
}
