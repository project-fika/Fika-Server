export declare class WeightedRandomHelper {
    /**
     * Choos an item from the passed in array based on the weightings of each
     * @param itemArray Items and weights to use
     * @returns Chosen item from array
     */
    getWeightedValue<T>(itemArray: {
        [key: string]: unknown;
    } | ArrayLike<unknown>): T;
    /**
     * Picks the random item based on its weight.
     * The items with higher weight will be picked more often (with a higher probability).
     *
     * For example:
     * - items = ['banana', 'orange', 'apple']
     * - weights = [0, 0.2, 0.8]
     * - weightedRandom(items, weights) in 80% of cases will return 'apple', in 20% of cases will return
     * 'orange' and it will never return 'banana' (because probability of picking the banana is 0%)
     *
     * @param {any[]} items
     * @param {number[]} weights
     * @returns {{item: any, index: number}}
     */
    weightedRandom(items: any[], weights: any[]): {
        item: any;
        index: number;
    };
    /**
     * Find the greated common divisor of all weights and use it on the passed in dictionary
     * @param weightedDict values to reduce
     */
    reduceWeightValues(weightedDict: Record<string, number>): void;
    protected commonDivisor(numbers: number[]): number;
    protected gcd(a: number, b: number): number;
}
