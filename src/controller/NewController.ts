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
import {NetTechApi} from "../dao/api/NetTechApi";
import {NetNewResponse} from "../dto/response/NetNewResponse";
import {NetHtml} from "../dao/html/NetHtml";

const logger = LoggerFactory.getLogger(ProjectConstant.PROJECT_NAME + ".controller.NewController");

@RequestMapping("/news")
@RestController
export class NewController {
    @Autowired
    private netTechApi: NetTechApi;

    @Autowired
    private netHtml: NetHtml;

    @GetMapping("/tech")
    @Valid
    @ReturnGenericsProperty(new Map<string, new () => object>().set("Standard", Standard).set("Standard.data", Boolean))
    public async getTech163(): Promise<Standard<Boolean>> {
        logger.info("getTech163-controller-start-request");
        const standard = new Standard<Boolean>();
        // 获取网易科技新闻 前100页
        let netNewResponse = await this.netTechApi.getTechDataByPage(2);
        for (let news of netNewResponse) {
            await ProcessUtil.sleep(1000);
            await this.netHtml.getNewsContent(news.getReadUrl());
        }

        logger.info("getTech163-controller-end-request result:[{}]", JsonProtocol.toJSONString(netNewResponse[0], NetNewResponse.getReturn(), "root"));
        standard.setData(true)
        return standard;
    }


}
