export declare class FindSlotResult {
    success: boolean;
    x: any;
    y: any;
    rotation: boolean;
    constructor(success?: boolean, x?: any, y?: any, rotation?: boolean);
}
export declare class ContainerHelper {
    /**
     * Finds a slot for an item in a given 2D container map
     * @param container2D Array of container with slots filled/free
     * @param itemWidth Width of item
     * @param itemHeight Height of item
     * @returns Location to place item in container
     */
    findSlotForItem(container2D: number[][], itemWidth: number, itemHeight: number): FindSlotResult;
    /**
     * Find a slot inside a container an item can be placed in
     * @param container2D Container to find space in
     * @param containerX Container x size
     * @param containerY Container y size
     * @param x ???
     * @param y ???
     * @param itemW Items width
     * @param itemH Items height
     * @returns True - slot found
     */
    protected locateSlot(container2D: number[][], containerX: number, containerY: number, x: number, y: number, itemW: number, itemH: number): boolean;
    /**
     * Find a free slot for an item to be placed at
     * @param container2D Container to place item in
     * @param x Container x size
     * @param y Container y size
     * @param itemW Items width
     * @param itemH Items height
     * @param rotate is item rotated
     */
    fillContainerMapWithItem(container2D: number[][], x: number, y: number, itemW: number, itemH: number, rotate: boolean): void;
}
