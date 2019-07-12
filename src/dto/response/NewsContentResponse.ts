/**
 *
 * 功能描述:
 *
 * @className NewsContentResponse
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/12 11:41
 */
import {JsonProperty} from "papio-common";
import {NewsCommentResponse} from "./NewsCommentResponse";

export class NewsContentResponse {

    @JsonProperty
    private url: string;

    @JsonProperty
    private html: string;

    @JsonProperty
    private title: string;

    @JsonProperty
    private source: string;

    @JsonProperty
    private web: string;

    @JsonProperty
    private editor: string;

    @JsonProperty
    private time: Date;

    @JsonProperty
    private commentList: NewsCommentResponse[];

    public getUrl (): string {
        return this.url;
    }
    public setUrl (url: string): void {
        this.url = url;
    }
    public getHtml (): string {
        return this.html;
    }
    public setHtml (html: string): void {
        this.html = html;
    }
    public getTitle (): string {
        return this.title;
    }
    public setTitle (title: string): void {
        this.title = title;
    }
    public getSource (): string {
        return this.source;
    }
    public setSource (source: string): void {
        this.source = source;
    }
    public getWeb (): string {
        return this.web;
    }
    public setWeb (web: string): void {
        this.web = web;
    }
    public getEditor (): string {
        return this.editor;
    }
    public setEditor (editor: string): void {
        this.editor = editor;
    }
    public getTime (): Date {
        return this.time;
    }
    public setTime (time: Date): void {
        this.time = time;
    }
    public getCommentList (): NewsCommentResponse[] {
        return this.commentList;
    }
    public setCommentList (commentList: NewsCommentResponse[]): void {
        this.commentList = commentList;
    }


}
