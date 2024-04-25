export interface ISaveCallbacks {
    load(): void;
    update(secondsSinceLastRun: number): boolean;
}
