/**
 *
 * 功能描述:
 *
 * @className NewsServiceImpl
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/8/30 17:35
 */
import {Autowired, JsonProtocol, ProcessUtil, Service} from "papio";
import {NewsService} from "../NewsService";
import {ContentCommentOutRequest} from "../../dto/request/ContentCommentOutRequest";
import {NetNewResponse} from "../../dto/response/NetNewResponse";
import {NewsContentResponse} from "../../dto/response/NewsContentResponse";
import {NetApi} from "../../dao/api/NetApi";
import {NetHtml} from "../../dao/html/NetHtml";
import {LoggerFactory} from "type-slf4";
import {ProjectConstant} from "../../common/constant/ProjectConstant";
import {ContentNewsRequest} from "../../dto/request/ContentNewsRequest";
import {UserOutRequest} from "../../dto/request/UserOutRequest";
import {ContentNewsClient} from "../../dao/client/ContentNewsClient";

const logger = LoggerFactory.getLogger(ProjectConstant.PROJECT_NAME + ".service.NewsServiceImpl");

@Service
export class NewsServiceImpl extends NewsService {
    @Autowired(NetApi)
    private netApi: NetApi;

    @Autowired(NetHtml)
    private netHtml: NetHtml;

    @Autowired(ContentNewsClient)
    private contentNewsClient: ContentNewsClient;

    public async getNewsContent(news: NetNewResponse): Promise<NewsContentResponse> {
        await ProcessUtil.sleep(1000);
        logger.info("开始请求新闻内容 url:[{}]", news.getReadUrl());
        const newsContentResponse = await this.netHtml.getNewsContent(news.getReadUrl());
        logger.info("开始请求新闻评论 id:[{}]", newsContentResponse.getId());
        const newsCommentResponses = await this.netApi.getComments(newsContentResponse.getId());
        newsContentResponse.setCommentList(newsCommentResponses);

        let labels: string[] = [];
        if (news.getKeywords()) {
            labels = news.getKeywords().map((value) => value.getName());
        }
        newsContentResponse.setLabels(labels);
        return newsContentResponse;
    }

    public async getTech163(page: number): Promise<NewsContentResponse[]> {
        // 获取网易科技新闻 前10页
        const newsContentResponseList: NewsContentResponse[] = [];
        await ProcessUtil.sleep(3000);
        logger.info("开始请求新闻列表 第[{}]页", page);
        const netNewResponse = await this.netApi.getTechDataByPage(page);
        for (const news of netNewResponse) {
            if (news.getReadUrl().indexOf("photoview") !== -1) {
                // 过滤图集
                continue;
            }
            const newsContentResponse = await this.getNewsContent(news);
            newsContentResponse.setZone("tech");
            newsContentResponseList.push(newsContentResponse);
        }
        return newsContentResponseList;
    }

    public async pushList(list: NewsContentResponse[]): Promise<void> {
        for (const newsContentResponse of list) {
            const contentNewsRequest = new ContentNewsRequest();
            JsonProtocol.copyProperties(newsContentResponse, contentNewsRequest);
            contentNewsRequest.setTime(newsContentResponse.getTime());
            contentNewsRequest.setLabels(newsContentResponse.getLabels());
            contentNewsRequest.setCommentList([]);
            newsContentResponse.getCommentList().forEach((value) => {
                const contentCommentOutRequest = new ContentCommentOutRequest();
                const userOutRequest = new UserOutRequest();
                JsonProtocol.copyProperties(value, contentCommentOutRequest);
                JsonProtocol.copyProperties(value.getUser(), userOutRequest);
                contentCommentOutRequest.setUser(userOutRequest);
                contentCommentOutRequest.setTime(value.getTime());
                contentNewsRequest.getCommentList().push(contentCommentOutRequest);
            });
            logger.info("开始推送 contentNewsRequest:[{}]", JsonProtocol.toJSONString(contentNewsRequest));
            this.contentNewsClient.push(contentNewsRequest);
        }
    }

    public async getTech163AndPull(page: number): Promise<void> {
        try {
            const list = await this.getTech163(page);
            await this.pushList(list);
        } catch (e) {
            logger.error("获取和推送 page:[{}]", e, page);
        }
    }
}
