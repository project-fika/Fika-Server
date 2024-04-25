export interface OnLoad {
    onLoad(): Promise<void>;
    getRoute(): string;
}
