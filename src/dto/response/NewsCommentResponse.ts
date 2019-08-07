import {JsonProperty, ReturnGenericsProperty} from "papio-common";
import {UserResponse} from "./UserResponse";

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
    @ReturnGenericsProperty(new Map<string, new () => object>().set("user", UserResponse))
    private user: UserResponse;

    public getId(): string {
        return this.id;
    }
    public setId(id: string): void {
        this.id = id;
    }
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
    public getUser (): UserResponse {
        return this.user;
    }
    public setUser (user: UserResponse): void {
        this.user = user;
    }
}
