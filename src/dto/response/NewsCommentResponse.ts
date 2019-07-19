import {JsonProperty} from "papio-common";
import {MemberResponse} from "./MemberResponse";

/**
 *
 * 功能描述:
 *
 * @className NewsCommentResponse
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/12 11:45
 */
export class NewsCommentResponse {
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
    private member: MemberResponse;

    public getContent (): string {
        return this.content;
    }
    public setContent (content: string): void {
        this.content = content;
    }
    public getTime (): Date {
        return this.time;
    }
    public setTime (time: Date): void {
        this.time = time;
    }
    public getAgainst (): number {
        return this.against;
    }
    public setAgainst (against: number): void {
        this.against = against;
    }
    public getVote (): number {
        return this.vote;
    }
    public setVote (vote: number): void {
        this.vote = vote;
    }
    public getShare (): number {
        return this.share;
    }
    public setShare (share: number): void {
        this.share = share;
    }
    public getMember (): MemberResponse {
        return this.member;
    }
    public setMember (member: MemberResponse): void {
        this.member = member;
    }
}
