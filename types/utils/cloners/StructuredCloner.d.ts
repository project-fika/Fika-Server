import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class StructuredCloner implements ICloner {
    clone<T>(obj: T): T;
    cloneAsync<T>(obj: T): Promise<T>;
}
