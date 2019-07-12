import {Configuration, DateFormatEnum, DateUtil} from "papio-common";
import * as IconvLite from "iconv-lite";
import {HttpConstant} from "../../common/constant/HttpConstant";
import fetch from "node-fetch";
import * as cheerio  from "cheerio";
import {NewsContentResponse} from "../../dto/response/NewsContentResponse";

/**
 *
 * 功能描述:
 *
 * @className NetHtml
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/11 9:51
 */
@Configuration
export class NetHtml {
    public async getNewsContent(url: string): Promise<NewsContentResponse> {
        let data = await fetch(url, {
            headers: HttpConstant.NET_GBK_HEADERS
        }).then(res => res.buffer());
        let dataStr = IconvLite.decode(data, "GBK");
        const newsContentResponse = new NewsContentResponse();
        const root = cheerio.load(dataStr, { decodeEntities: false });
        const content = root("#epContentLeft");
        // 获取title
        newsContentResponse.setTitle(content.children().first().text());
        // 获取时间
        const timeContent = content.children(".post_time_source").contents().filter(function () {
            return this.nodeType == 3;
        }).text().replace("来源:", "").trim();
        newsContentResponse.setTime(DateUtil.parse(timeContent, DateFormatEnum.DATETIME));
        newsContentResponse.setSource(root("#ne_article_source").text());
        newsContentResponse.setHtml(root("#endText").html());
        newsContentResponse.setUrl(url);
        newsContentResponse.setWeb("net");
        newsContentResponse.setEditor(root(".ep-editor").text());


        return newsContentResponse;
    }
}
