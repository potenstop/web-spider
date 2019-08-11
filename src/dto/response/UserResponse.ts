import {JsonProperty} from "papio";

/**
 *
 * 功能描述:
 *
 * @className UserResponse
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/17 15:28
 */
export class UserResponse {

    @JsonProperty
    private userName: string;

    @JsonProperty
    private avatar: string;

    @JsonProperty
    private sourceWeb: string;

    @JsonProperty
    private sourceEntrance: string;

    @JsonProperty
    private sourceUserId: string;

    public getUserName (): string {
        return this.userName;
    }
    public setUserName (userName: string): void {
        this.userName = userName;
    }
    public getAvatar(): string {
        return this.avatar;
    }
    public setAvatar(avatar: string): void {
        this.avatar = avatar;
    }
    public getSourceWeb(): string {
        return this.sourceWeb;
    }
    public setSourceWeb(sourceWeb: string): void {
        this.sourceWeb = sourceWeb;
    }
    public getSourceEntrance(): string {
        return this.sourceEntrance;
    }
    public setSourceEntrance(sourceEntrance: string): void {
        this.sourceEntrance = sourceEntrance;
    }
    public getSourceUserId (): string {
        return this.sourceUserId;
    }
    public setSourceUserId (sourceUserId: string): void {
        this.sourceUserId = sourceUserId;
    }

}
