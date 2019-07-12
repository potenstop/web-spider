/**
 *
 * 功能描述:
 *
 * @className NetKeyWordResponse
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/11 16:48
 */
import {JsonProperty} from "papio-common";

export class NetKeyWordResponse {

    @JsonProperty("akey_link")
    private link: string;

    @JsonProperty("keyname")
    private name: string;

    public getLink (): string {
        return this.link;
    }
    public setLink (link: string): void {
        this.link = link;
    }
    public getName (): string {
        return this.name;
    }
    public setName (name: string): void {
        this.name = name;
    }
}
