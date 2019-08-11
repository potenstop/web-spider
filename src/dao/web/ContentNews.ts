/**
 *
 * 功能描述:
 *
 * @className WebApi
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/8/2 13:05
 */
import {PostMapping, RequestBody, RestRemote, ReturnGenericsProperty} from "papio";
import {Standard} from "papio";
import {ContentNewsRequest} from "../../dto/request/ContentNewsRequest";

@RestRemote({filepath: __dirname, name: "/content-news", timeout: 0})
export class ContentNews {
    @PostMapping({path: "/push"})
    @ReturnGenericsProperty(new Map<string, new () => object>().set("Standard", Standard).set("Standard.data", Boolean))
    public push(@RequestBody request: ContentNewsRequest): Promise<Standard<boolean>> {
        return null;
    }
}
