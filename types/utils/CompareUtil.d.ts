export declare class CompareUtil {
    private static typesToCheckAgainst;
    /**
     * This function does an object comparison, equivalent to applying reflections
     * and scanning for all possible properties including arrays.
     * @param v1 value 1 to compare
     * @param v2 value 2 to compare
     * @returns true if equal, false if not
     */
    recursiveCompare(v1: any, v2: any): boolean;
}
