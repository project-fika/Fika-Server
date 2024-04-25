import { ICommand } from "@spt-aki/models/spt/utils/ICommand";
export interface IAsyncQueue {
    waitFor(command: ICommand): Promise<any>;
}
