/**
 * Converts a ReadableStream of Uint8Array to a string.
 *
 * @param stream - The ReadableStream to convert. If null, the function returns null.
 * @returns A promise that resolves to the string representation of the stream's content, or null if the stream is null.
 */
export declare function streamToString(stream: ReadableStream<Uint8Array> | null): Promise<string | null>;
