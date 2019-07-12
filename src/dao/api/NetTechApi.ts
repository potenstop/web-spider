/**
 *
 * 功能描述:
 *
 * @className NetApi
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/11 9:52
 */
import fetch from "node-fetch";
import {Configuration, JsonProtocol} from "papio-common";
import {HttpConstant} from "../../common/constant/HttpConstant";
import * as IconvLite from "iconv-lite";
import {NetNewResponse} from "../../dto/response/NetNewResponse";

const techDataList = "https://tech.163.com/special/00097UHL/tech_datalist";

function cleanDataCallback(data: string) {
    //去掉头部的 data_callback(
    let str = data.replace('data_callback(','');
    //去掉尾部的 )
    str = str.replace(')','');
    return str;
}

@Configuration
export class NetTechApi {
    public async getTechDataByPage(page: number): Promise<NetNewResponse[]> {
        let pageStr: string = '01';
        if (page === 1) {
            pageStr = "";
        } else if (page < 10) {
            pageStr = "_0" + page;
        } else {
            pageStr = "_" + page;
        }
        let data = await fetch(techDataList + pageStr + ".js?callback=data_callback", {
            headers: HttpConstant.NET_GBK_HEADERS
        }).then(res => res.buffer());
        let dataStr = IconvLite.decode(data, "GBK");
        dataStr = cleanDataCallback(dataStr);
        return JsonProtocol.arrayToBeans<NetNewResponse>(JSON.parse(dataStr), Array, NetNewResponse.getReturn(), "root") as NetNewResponse[];
    }

}
