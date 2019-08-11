/**
 *
 * 功能描述:
 *
 * @className NewController
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/11 9:38
 */
import {RestController, Standard} from "papio";
import {
    Autowired,
    GetMapping,
    JsonProtocol,
    ProcessUtil,
    RequestMapping,
    ReturnGenericsProperty,
    Valid,
} from "papio";
import {LoggerFactory} from "type-slf4";
import {ProjectConstant} from "../common/constant/ProjectConstant";
import {NetApi} from "../dao/api/NetApi";
import {NetNewResponse} from "../dto/response/NetNewResponse";
import {NetHtml} from "../dao/html/NetHtml";
import {NewsContentResponse} from "../dto/response/NewsContentResponse";
import {ContentNews} from "../dao/web/ContentNews";
import {ContentNewsRequest} from "../dto/request/ContentNewsRequest";
import {ContentCommentOutRequest} from "../dto/request/ContentCommentOutRequest";
import {UserOutRequest} from "../dto/request/UserOutRequest";

const logger = LoggerFactory.getLogger(ProjectConstant.PROJECT_NAME + ".controller.NewController");

@RequestMapping("/news")
@RestController
export class NewController {
    @Autowired
    private netApi: NetApi;

    @Autowired
    private netHtml: NetHtml;

    @Autowired
    private contentNews: ContentNews;

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

    @GetMapping("/tech")
    @Valid
    @ReturnGenericsProperty(new Map<string, new () => object>().set("Standard", Standard).set("Standard.data", Boolean))
    public async getTech163(): Promise<Standard<boolean>> {
        logger.info("getTech163-controller-start-request");
        const standard = new Standard<boolean>();
        // 获取网易科技新闻 前10页
        for (let page = 1; page <= 10; page++) {
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
                logger.info("push-start request:[{}]", JsonProtocol.toJSONString(contentNewsRequest));
                await this.contentNews.push(contentNewsRequest).catch((error) => {
                    logger.error("push-error ", error);
                });
                logger.info("push-end response");
            }
        }
        standard.setData(true);
        logger.info("getTech163-controller-end-request");
        return standard;
    }

}
