import { inject, injectable } from "tsyringe";

import { FileSystemSync } from "@spt/utils/FileSystemSync";
import { JsonUtil } from "@spt/utils/JsonUtil";

import { IFikaFriendRequests } from "../../models/fika/IFikaFriendRequests";
import { FikaConfig } from "../../utils/FikaConfig";

@injectable()
export class FikaFriendRequestsCacheService {
    private friendRequests: IFikaFriendRequests[];
    private friendRequestsFullPath: string;
    private readonly friendRequestsPath = "cache/friendRequests.json";

    constructor(
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
        @inject("FileSystemSync") protected fileSystemSync: FileSystemSync,
        @inject("FikaConfig") protected fikaConfig: FikaConfig,
    ) {
        this.friendRequestsFullPath = `./${this.fikaConfig.getModPath()}${this.friendRequestsPath}`;

        if (!this.fileSystemSync.exists(this.friendRequestsFullPath)) {
            this.fileSystemSync.write(this.friendRequestsFullPath, "[]");
        }

        this.friendRequests = this.jsonUtil.deserialize(this.fileSystemSync.read(this.friendRequestsFullPath), this.friendRequestsFullPath);
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

        this.fileSystemSync.write(this.friendRequestsFullPath, this.jsonUtil.serialize(this.friendRequests));
    }

    public storeFriendRequest(value: IFikaFriendRequests): void {
        this.friendRequests.push(value);

        this.fileSystemSync.write(this.friendRequestsFullPath, this.jsonUtil.serialize(this.friendRequests));
    }
}
