/**
 *
 * 功能描述:
 *
 * @className NewsContentResponse
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/12 11:41
 */
import {JsonProperty, ReturnGenericsProperty} from "papio";
import { ContentCommentOutRequest } from "./ContentCommentOutRequest";

export class ContentNewsRequest {

    @JsonProperty
    private id: string;

    @JsonProperty
    private url: string;

    @JsonProperty
    private html: string;

    @JsonProperty
    private title: string;

    @JsonProperty
    private articleSource: string;

    @JsonProperty
    private webSource: string;

    @JsonProperty
    private editor: string;

    @JsonProperty
    private time: Date;

    @JsonProperty
    private zone: string;

    @ReturnGenericsProperty(new Map<string, new () => object>().set("Array", String))
    @JsonProperty
    private labels: string[];

    @ReturnGenericsProperty(new Map<string, new () => object>().set("Array", ContentCommentOutRequest))
    @JsonProperty
    private commentList: ContentCommentOutRequest[];

    public getId (): string {
        return this.id;
    }
    public setId (id: string): void {
        this.id = id;
    }
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
    public getArticleSource (): string {
        return this.articleSource;
    }
    public setArticleSource (articleSource: string): void {
        this.articleSource = articleSource;
    }
    public getWebSource (): string {
        return this.webSource;
    }
    public setWebSource (webSource: string): void {
        this.webSource = webSource;
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
    public getZone(): string {
        return this.zone;
    }
    public setZone (zone: string): void {
        this.zone = zone;
    }
    public getLabels (): string[] {
        return this.labels;
    }
    public setLabels (labels: string[]): void {
        this.labels = labels;
    }
    public getCommentList (): ContentCommentOutRequest[] {
        return this.commentList;
    }
    public setCommentList (commentList: ContentCommentOutRequest[]): void {
        this.commentList = commentList;
    }


}
