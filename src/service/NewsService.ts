import {ContentCommentOutRequest} from "../dto/request/ContentCommentOutRequest";
import {NewsContentResponse} from "../dto/response/NewsContentResponse";

/**
 *
 * 功能描述:
 *
 * @className NewsService
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/8/30 17:26
 */
export interface NewsService {
    /**
     * 方法功能描述:
     * @author yanshaowen
     * @date 2019/8/30 17:34
     * @param
     * @return
     */
    getTech163(): Promise<NewsContentResponse[]>;
}
