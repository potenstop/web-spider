/**
 *
 * 功能描述:
 *
 * @className NewController
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/11 9:38
 */
import {Min, NotNull, RequestParam, RestController, Standard} from "papio";
import {
    Autowired,
    GetMapping,
    RequestMapping,
    ReturnGenericsProperty,
    Valid,
} from "papio";
import {LoggerFactory} from "type-slf4";
import {ProjectConstant} from "../common/constant/ProjectConstant";
import {NewsService} from "../service/NewsService";
import {ContentNewsClient} from "../dao/client/ContentNewsClient";

const logger = LoggerFactory.getLogger(ProjectConstant.PROJECT_NAME + ".controller.NewController");

@RequestMapping("/news")
@RestController
export class NewsController {
    @Autowired(NewsService)
    private newsService: NewsService;

    @GetMapping("/pull/tech")
    @Valid
    @ReturnGenericsProperty(new Map<string, new () => object>().set("Standard", Standard).set("Standard.data", Boolean))
    public async pullTech(@RequestParam @NotNull({message: "页码不能为空"}) @Min({value: 1, message: "页码最小值为1"}) page: number): Promise<Standard<boolean>> {
        logger.info("getTech163-controller-start-request page:[{}]", page);
        const standard = new Standard<boolean>();
        this.newsService.getTech163AndPull(page);
        standard.setData(true);
        logger.info("getTech163-controller-end-request");
        return standard;
    }

}
