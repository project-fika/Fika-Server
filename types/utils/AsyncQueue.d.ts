import { IAsyncQueue } from "@spt-aki/models/spt/utils/IAsyncQueue";
import { ICommand } from "@spt-aki/models/spt/utils/ICommand";
export declare class AsyncQueue implements IAsyncQueue {
    protected commandsQueue: ICommand[];
    constructor();
    waitFor(command: ICommand): Promise<any>;
}
