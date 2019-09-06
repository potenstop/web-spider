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
export abstract class NewsService {
    /**
     * 方法功能描述:
     * @author yanshaowen
     * @date 2019/8/30 17:34
     * @param page
     * @return
     */
    public abstract getTech163(page: number): Promise<NewsContentResponse[]>;

    /**
     * 方法功能描述:
     * @author yanshaowen
     * @date 2019/8/30 17:34
     * @param list
     * @return
     */
    public abstract pushList(list: NewsContentResponse[]): Promise<void>;

    /**
     * 方法功能描述:
     * @author yanshaowen
     * @date 2019/8/30 17:34
     * @param page
     * @return
     */
    public abstract getTech163AndPull(page: number): Promise<void>;
}
