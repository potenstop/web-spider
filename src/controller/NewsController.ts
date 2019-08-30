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
import {NewsService} from "../service/NewsService";

const logger = LoggerFactory.getLogger(ProjectConstant.PROJECT_NAME + ".controller.NewController");

@RequestMapping("/news")
@RestController
export class NewsController {
    @Autowired
    private newsService: NewsService;

    @GetMapping("/pull/tech")
    @Valid
    @ReturnGenericsProperty(new Map<string, new () => object>().set("Standard", Standard).set("Standard.data", Boolean))
    public async pullTech(): Promise<Standard<boolean>> {
        logger.info("getTech163-controller-start-request");
        const standard = new Standard<boolean>();
        this.newsService.getTech163();
        standard.setData(true);
        logger.info("getTech163-controller-end-request");
        return standard;
    }

}
