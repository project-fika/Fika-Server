import { ICloner } from "@spt-aki/utils/cloners/ICloner";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
export declare class ExhaustableArray<T> implements IExhaustableArray<T> {
    private itemPool;
    private randomUtil;
    private cloner;
    private pool;
    constructor(itemPool: T[], randomUtil: RandomUtil, cloner: ICloner);
    getRandomValue(): T;
    getFirstValue(): T;
    hasValues(): boolean;
}
export interface IExhaustableArray<T> {
    getRandomValue(): T;
    getFirstValue(): T;
    hasValues(): boolean;
}
