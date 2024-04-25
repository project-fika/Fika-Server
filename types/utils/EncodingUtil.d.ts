export declare class EncodingUtil {
    encode(value: string, encode: EncodeType): string;
    decode(value: string, encode: EncodeType): string;
    fromBase64(value: string): string;
    toBase64(value: string): string;
    fromHex(value: string): string;
    toHex(value: string): string;
}
export declare enum EncodeType {
    BASE64 = "base64",
    HEX = "hex",
    ASCII = "ascii",
    BINARY = "binary",
    UTF8 = "utf8"
}
