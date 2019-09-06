import {Autowired, Configuration, DateFormatEnum, DateUtil} from "papio";
import * as IconvLite from "iconv-lite";
import {HttpConstant} from "../../common/constant/HttpConstant";
import fetch from "node-fetch";
import * as cheerio  from "cheerio";
import {NewsContentResponse} from "../../dto/response/NewsContentResponse";
import {EnvConfig} from "../../config/EnvConfig";
import * as puppeteer from "puppeteer-core";

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
        const data = await fetch(url, {
            headers: HttpConstant.NET_GBK_HEADERS,
        }).then((res) => res.buffer());
        const dataStr = IconvLite.decode(data, "GBK");
        const newsContentResponse = new NewsContentResponse();
        const root = cheerio.load(dataStr, { decodeEntities: false });
        const content = root("#epContentLeft");
        const urls = url.split("/");
        const id = urls[urls.length - 1].replace(/\.html$/, "");
        newsContentResponse.setId(id);
        // 获取title
        newsContentResponse.setTitle(content.children().first().text());
        // 获取时间
        const timeContent = content.children(".post_time_source").contents().filter(function() {
            return this.nodeType == 3;
        }).text().replace("来源:", "").trim();
        newsContentResponse.setTime(DateUtil.parse(timeContent, DateFormatEnum.DATETIME));
        newsContentResponse.setArticleSource(root("#ne_article_source").text());
        newsContentResponse.setHtml(root("#endText").html());
        newsContentResponse.setUrl(url);
        newsContentResponse.setWebSource("net_news");
        newsContentResponse.setEditor(root(".ep-editor").text());

        // const browser = await puppeteer.launch({
        //     executablePath: this.envConfig.getChromePath()
        // });
        // const page = await browser.newPage();
        // await page.setRequestInterception(true);
        // page.on('request', interceptedRequest => {
        //     if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
        //         interceptedRequest.abort();
        //     else
        //         interceptedRequest.continue();
        // });
        // const commonHtml = await page.goto(NetHtml.commonApi + "/" + id +".html");
        // await page.screenshot({path: 'example.png'});

        // browser.close();
        return newsContentResponse;
    }
}
