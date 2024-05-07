import { inject, injectable } from "tsyringe";

import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS";

import { IFikaFriendRequests } from "../../models/fika/IFikaFriendRequests";
import { FikaConfig } from "../../utils/FikaConfig";

@injectable()
export class FikaFriendRequestsCacheService {
    private friendRequests: IFikaFriendRequests[];
    private friendRequestsFullPath: string;
    private readonly friendRequestsPath = "cache/friendRequests.json";

    constructor(
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
        @inject("VFS") protected vfs: VFS,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {
        this.friendRequestsFullPath = `./${this.fikaConfig.getModPath()}${this.friendRequestsPath}`;

        if (!this.vfs.exists(this.friendRequestsFullPath)) {
            this.vfs.writeFile(this.friendRequestsFullPath, "[]");
        }

        this.friendRequests = this.jsonUtil.deserialize(this.vfs.readFile(this.friendRequestsFullPath), this.friendRequestsFullPath);
    }

    public getAllFriendRequests(): IFikaFriendRequests[] {
        return this.friendRequests;
    }

    public getSentFriendRequests(profileId: string): IFikaFriendRequests[] | undefined {
        return this.friendRequests.filter((request) => request.from === profileId);
    }

    public getReceivedFriendRequests(profileId: string): IFikaFriendRequests[] | undefined {
        return this.friendRequests.filter((request) => request.to === profileId);
    }

    public exists(from: string, to: string): boolean {
        return !!this.friendRequests.find((request) => request.from === from && request.to === to);
    }

    public deleteFriendRequest(from: string, to: string): void {
        const index = this.friendRequests.findIndex((request) => request.from === from && request.to === to);
        if (index === -1) {
            return;
        }

        this.friendRequests.splice(index, 1);

        this.vfs.writeFile(this.friendRequestsFullPath, this.jsonUtil.serialize(this.friendRequests));
    }

    public storeFriendRequest(value: IFikaFriendRequests): void {
        this.friendRequests.push(value);

        this.vfs.writeFile(this.friendRequestsFullPath, this.jsonUtil.serialize(this.friendRequests));
    }
}
