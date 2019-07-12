/**
 *
 * 功能描述:
 *
 * @className HttpConstant
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/11 16:09
 */
export class HttpConstant {
    public static readonly USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36";
    public static readonly NET_GBK_HEADERS = { "Referer": "https://tech.163.com/", "User-Agent": HttpConstant.USER_AGENT, "Accept-Encoding": "GBK"};
    public static readonly NET_UTF8_HEADERS = { "Referer": "https://tech.163.com/", "User-Agent": HttpConstant.USER_AGENT, "Accept-Encoding": "UTF8"};
}
