export interface IBaseInteractionRequestData {
    Action: string;
    fromOwner?: OwnerInfo;
    toOwner?: OwnerInfo;
}
export interface OwnerInfo {
    id: string;
    type: string;
}
