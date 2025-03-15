export interface ICloner {
    clone<T>(obj: T): T;
    cloneAsync<T>(obj: T): Promise<T>;
}
