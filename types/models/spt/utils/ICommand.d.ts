export interface ICommand {
    uuid: string;
    cmd: () => Promise<any>;
}
