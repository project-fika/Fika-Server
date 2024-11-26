export interface IFikaCheckModResponse {
    forbidden: string[];
    missingRequired: string[];
    hashMismatch: string[];
}

export interface IVersionCheckResponse {
    version: string;
}
