import {JsonProperty} from "papio-common";
import {MemberRequest} from "./MemberResponse";

/**
 *
 * 功能描述:
 *
 * @className NewsCommentRequest
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/20 21:20
 */
export class NewsCommentRequest {
    @JsonProperty
    private id: string;

    @JsonProperty
    private content: string;

    @JsonProperty
    private time: Date;

    @JsonProperty
    private against: number;

    @JsonProperty
    private vote: number;

    @JsonProperty
    private share: number;

    @JsonProperty
    private member: MemberRequest;

    public getContent(): string {
        return this.content;
    }
    public setContent(content: string): void {
        this.content = content;
    }
    public getTime(): Date {
        return this.time;
    }
    public setTime(time: Date): void {
        this.time = time;
    }
    public getAgainst(): number {
        return this.against;
    }
    public setAgainst(against: number): void {
        this.against = against;
    }
    public getVote(): number {
        return this.vote;
    }
    public setVote(vote: number): void {
        this.vote = vote;
    }
    public getShare(): number {
        return this.share;
    }
    public setShare(share: number): void {
        this.share = share;
    }
    public getMember(): MemberRequest {
        return this.member;
    }
    public setMember(member: MemberRequest): void {
        this.member = member;
    }
}
