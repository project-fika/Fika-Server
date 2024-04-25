export interface IChooseRandomCompatibleModResult {
    incompatible: boolean;
    found?: boolean;
    chosenTpl?: string;
    reason: string;
    slotBlocked?: boolean;
}
