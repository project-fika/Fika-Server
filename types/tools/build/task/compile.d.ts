/**
 * Compiles an executable from the given entry point.
 *
 * @param entryPoint - The entry point file to compile.
 * @returns A promise that resolves when the compilation is complete.
 */
export declare const compile: (entryPoint: string) => Promise<void>;
/**
 * Updates the properties of the executable file for the server.
 */
export declare const updateExecutable: () => Promise<void>;
