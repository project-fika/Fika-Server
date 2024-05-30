export interface IFikaCheckModResponse {
    forbidden: string[];
    missingRequired: string[];
    hashMismatch: string[];
}
