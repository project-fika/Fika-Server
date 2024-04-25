export interface OnUpdate {
    onUpdate(timeSinceLastRun: number): Promise<boolean>;
    getRoute(): string;
}
