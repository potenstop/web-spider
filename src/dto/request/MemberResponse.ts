import {JsonProperty} from "papio";

/**
 *
 * 功能描述:
 *
 * @className MemberResponse
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/17 15:28
 */
export class MemberRequest {
    @JsonProperty
    private memberId: string;

    @JsonProperty
    private memberName: string;

    @JsonProperty
    private avatar: string;

    @JsonProperty
    private sourceWeb: string;

    @JsonProperty
    private sourceEntrance: string;

    @JsonProperty
    private sourceMemberId: string;

    public getMemberId(): string {
        return this.memberId;
    }
    public setMemberId(memberId: string): void {
        this.memberId = memberId;
    }
    public getMemberName(): string {
        return this.memberName;
    }
    public setMemberName(memberName: string): void {
        this.memberName = memberName;
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
    public getSourceMemberId(): string {
        return this.sourceMemberId;
    }
    public setSourceMemberId(sourceMemberId: string): void {
        this.sourceMemberId = sourceMemberId;
    }

}
