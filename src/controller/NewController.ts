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
} from "papio-common";
import {LoggerFactory} from "type-slf4";
import {ProjectConstant} from "../common/constant/ProjectConstant";
import {NetApi} from "../dao/api/NetApi";
import {NetNewResponse} from "../dto/response/NetNewResponse";
import {NetHtml} from "../dao/html/NetHtml";
import {NewsContentResponse} from "../dto/response/NewsContentResponse";
import {NewsContentRequest} from "../dto/request/NewsContentRequest";
import {WebApi} from "../dao/api/WebApi";
import {log} from "util";

const logger = LoggerFactory.getLogger(ProjectConstant.PROJECT_NAME + ".controller.NewController");

@RequestMapping("/news")
@RestController
export class NewController {
    @Autowired
    private netApi: NetApi;

    @Autowired
    private netHtml: NetHtml;

    @Autowired
    private webApi: WebApi;

    public async getNewsContent(news: NetNewResponse): Promise<NewsContentResponse>{
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
                const newsContentResponse = await this.getNewsContent(news);
                newsContentResponse.setZone("tech");
                const json = JsonProtocol.toJson(newsContentResponse);
                const newsContentRequest = JsonProtocol.jsonToBean(json, NewsContentRequest);
                this.webApi.pushNews(newsContentRequest).then(result => {
                    logger.info("推送结果", JSON.stringify(result));
                }).catch((e) => {
                    logger.error("推送失败", e);
                });
            }
        }
        standard.setData(true);
        logger.info("getTech163-controller-end-request");
        return standard;
    }


}
