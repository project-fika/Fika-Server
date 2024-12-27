/**
 * Asynchronously performs a pre-build clean operation.
 *
 * @returns A promise that resolves when the clean operation is complete.
 */
export declare const cleanPre: () => Promise<void>;
/**
 * Asynchronously performs post-compile clean-up tasks.
 *
 * @returns A promise that resolves when the clean-up tasks are complete.
 */
export declare const cleanPost: () => Promise<void>;
