export interface IVersionValidateRequestData {
    version: Version;
    develop: boolean;
}
export interface Version {
    major: string;
    minor: string;
    game: string;
    backend: string;
    taxonomy: string;
}
