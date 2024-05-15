export interface IGroupCurrentResponse {
    squad: ISquadMember[];
}
export interface ISquadMember {
    _id: string;
    aid: number;
    Info: any;
    isLeader: boolean;
    isReady: boolean;
}
