import {JsonProperty} from "papio-common";

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
    private memberId: string;

    @JsonProperty
    private memberName: string;

    @JsonProperty
    private content: string;

    @JsonProperty
    private time: Date;

    @JsonProperty
    private address: string;

    @JsonProperty
    private upNumber: number;

    @JsonProperty
    private downNumber: number;

    public getMemberId (): string {
        return this.memberId;
    }
    public setMemberId (memberId: string): void {
        this.memberId = memberId;
    }
    public getMemberName (): string {
        return this.memberName;
    }
    public setMemberName (memberName: string): void {
        this.memberName = memberName;
    }
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
    public getAddress (): string {
        return this.address;
    }
    public setAddress (address: string): void {
        this.address = address;
    }
    public getUpNumber (): number {
        return this.upNumber;
    }
    public setUpNumber (upNumber: number): void {
        this.upNumber = upNumber;
    }
    public getDownNumber (): number {
        return this.downNumber;
    }
    public setDownNumber (downNumber: number): void {
        this.downNumber = downNumber;
    }

}
