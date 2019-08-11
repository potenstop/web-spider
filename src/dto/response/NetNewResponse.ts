/**
 *
 * 功能描述:
 *
 * @className NetNewResponse
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/11 16:43
 */
import {NetKeyWordResponse} from "./NetKeyWordResponse";
import {JsonProperty, ReturnGenericsProperty} from "papio";

export class NetNewResponse {

    @JsonProperty
    private title: string;

    @JsonProperty("docurl")
    private readUrl: string;

    @JsonProperty("commenturl")
    private commentUrl: string;

    @JsonProperty
    private tienum: number;

    @JsonProperty
    private tlastid: string;

    @JsonProperty
    private tlink: string;

    @JsonProperty
    private label: string;

    @JsonProperty
    @ReturnGenericsProperty(new Map<string, new () => object>().set("Array", NetKeyWordResponse))
    private keywords: NetKeyWordResponse[];

    @JsonProperty
    private time: string;

    @JsonProperty("imgurl")
    private imgUrl: string;

    public getTitle(): string {
        return this.title;
    }
    public setTitle(title: string): void {
        this.title = title;
    }
    public getReadUrl(): string {
        return this.readUrl;
    }
    public setReadUrl(readUrl: string): void {
        this.readUrl = readUrl;
    }
    public getCommentUrl(): string {
        return this.commentUrl;
    }
    public setCommentUrl(commentUrl: string): void {
        this.commentUrl = commentUrl;
    }
    public getTienum(): number {
        return this.tienum;
    }
    public setTienum(tienum: number): void {
        this.tienum = tienum;
    }
    public getTlastid(): string {
        return this.tlastid;
    }
    public setTlastid(tlastid: string): void {
        this.tlastid = tlastid;
    }
    public getTlink(): string {
        return this.tlink;
    }
    public setTlink(tlink: string): void {
        this.tlink = tlink;
    }
    public getLabel(): string {
        return this.label;
    }
    public setLabel(label: string): void {
        this.label = label;
    }
    public getKeywords(): NetKeyWordResponse[] {
        return this.keywords;
    }
    public setKeywords(keywords: NetKeyWordResponse[]): void {
        this.keywords = keywords;
    }
    public getTime(): string {
        return this.time;
    }
    public setTime(time: string): void {
        this.time = time;
    }
    public getImgUrl(): string {
        return this.imgUrl;
    }
    public setImgUrl(imgUrl: string): void {
        this.imgUrl = imgUrl;
    }
}
