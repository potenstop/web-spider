/**
 *
 * 功能描述:
 *
 * @className WebApi
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/20 21:09
 */
import {PostMapping, RequestBody, RestRemote} from "papio-common";
import { Standard } from "papio";
import {NewsContentRequest} from "../../dto/request/NewsContentRequest";

@RestRemote({filepath: __dirname, name: "/"})
export class WebApi {
    @PostMapping("/content-news/push")
    public pushNews(@RequestBody news: NewsContentRequest): Promise<Standard<boolean>> {
        return null;
    }

}
