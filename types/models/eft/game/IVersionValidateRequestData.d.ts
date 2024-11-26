export interface IVersionValidateRequestData {
    version: IVersion;
    develop: boolean;
}
export interface IVersion {
    major: string;
    minor: string;
    game: string;
    backend: string;
    taxonomy: string;
}
