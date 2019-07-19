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
    Valid
} from "papio-common";
import {LoggerFactory} from "type-slf4";
import {ProjectConstant} from "../common/constant/ProjectConstant";
import {NetApi} from "../dao/api/NetApi";
import {NetNewResponse} from "../dto/response/NetNewResponse";
import {NetHtml} from "../dao/html/NetHtml";
import {NewsContentResponse} from "../dto/response/NewsContentResponse";

const logger = LoggerFactory.getLogger(ProjectConstant.PROJECT_NAME + ".controller.NewController");

@RequestMapping("/news")
@RestController
export class NewController {
    @Autowired
    private netApi: NetApi;

    @Autowired
    private netHtml: NetHtml;

    public async getNewsContent(news: NetNewResponse): Promise<NewsContentResponse>{
        await ProcessUtil.sleep(1000);
        logger.info("开始请求新闻内容 url:[{}]", news.getReadUrl());
        const newsContentResponse = await this.netHtml.getNewsContent(news.getReadUrl());
        logger.info("开始请求新闻评论 id:[{}]", newsContentResponse.getId());
        const newsCommentResponses = await this.netApi.getComments(newsContentResponse.getId());
        newsContentResponse.setCommentList(newsCommentResponses);

        let labels: string[] = [];
        if (news.getKeywords()) {
            labels = news.getKeywords().map(value => value.getName());
        }
        newsContentResponse.setLabels(labels);
        return newsContentResponse;
    }

    @GetMapping("/tech")
    @Valid
    @ReturnGenericsProperty(new Map<string, new () => object>().set("Standard", Standard).set("Standard.data", Array).set("Standard.data.Array", NewsContentResponse))
    public async getTech163(): Promise<Standard<NewsContentResponse[]>> {
        logger.info("getTech163-controller-start-request");
        const standard = new Standard<NewsContentResponse[]>();
        const newsContentResponseList: NewsContentResponse[] = [];
        // 获取网易科技新闻 前10页
        for (let page = 1; page <= 10; page++) {
            await ProcessUtil.sleep(3000);
            logger.info("开始请求新闻列表 第[{}]页", page);
            let netNewResponse = await this.netApi.getTechDataByPage(page);
            for (let news of netNewResponse) {
                const newsContentResponse = await this.getNewsContent(news);
                newsContentResponse.setZone("tech");
                newsContentResponseList.push(newsContentResponse);
            }
        }
        standard.setData(newsContentResponseList);
        logger.info("getTech163-controller-end-request");
        return standard;
    }


}
