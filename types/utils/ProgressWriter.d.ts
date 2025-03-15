export declare class ProgressWriter {
    private count;
    private total?;
    private done;
    private barFillChar;
    private barEmptyChar;
    private maxBarLength;
    constructor(total: number, maxBarLength?: number, barFillChar?: string, barEmptyChar?: string);
    /**
     * Increment the progress counter and update the progress bar display.
     */
    increment(): void;
}
