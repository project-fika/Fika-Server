import { ICommand } from "@spt/models/spt/utils/ICommand";
export interface IAsyncQueue {
    waitFor(command: ICommand): Promise<any>;
}
