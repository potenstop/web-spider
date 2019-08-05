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
import {Configuration, DateFormatEnum, DateUtil, JsonProtocol} from "papio-common";
import {HttpConstant} from "../../common/constant/HttpConstant";
import * as IconvLite from "iconv-lite";
import {NetNewResponse} from "../../dto/response/NetNewResponse";
import {NewsCommentResponse} from "../../dto/response/NewsCommentResponse";
import {UserResponse} from "../../dto/response/UserResponse";

const techDataList = "https://tech.163.com/special/00097UHL/tech_datalist";

function cleanDataCallback(data: string) {
    // 去掉头部的 data_callback(
    let str = data.replace(/^data_callback\(/, "");
    // 去掉尾部的 )
    str = str.replace(/\)$/, "");
    return str;
}

@Configuration
export class NetApi {
    private static commentApi = "http://comment.api.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads";

    public async getTechDataByPage(page: number): Promise<NetNewResponse[]> {
        let pageStr: string = "01";
        if (page === 1) {
            pageStr = "";
        } else if (page < 10) {
            pageStr = "_0" + page;
        } else {
            pageStr = "_" + page;
        }
        const data = await fetch(techDataList + pageStr + ".js?callback=data_callback", {
            headers: HttpConstant.NET_GBK_HEADERS,
        }).then((res) => res.buffer());
        let dataStr = IconvLite.decode(data, "GBK");
        dataStr = cleanDataCallback(dataStr);
        return JsonProtocol.arrayToBeans<NetNewResponse>(JSON.parse(dataStr), Array, new Map<string, new () => object>().set("Array", NetNewResponse));
    }
    public async getComments(newsId: string): Promise<NewsCommentResponse[]> {
        // 获取评论
        let hasNextPage = true;
        let offset = 0;
        const newsCommentResponseList: NewsCommentResponse[] = [];
        while (hasNextPage) {
            try {
                const commentUrl = `${NetApi.commentApi}/${newsId}/comments/newList?ibc=newspc&limit=30&showLevelThreshold=72&headLimit=1&tailLimit=2&offset=${offset}`;
                const commentData = await fetch(commentUrl, {
                    headers: HttpConstant.NET_GBK_HEADERS,
                }).then((res) => res.json());
                let counts = 0;
                for (const commentId of Object.keys(commentData.comments)) {
                    counts++;
                    const commentContent = commentData.comments[commentId];
                    const newsCommentResponse = new NewsCommentResponse();
                    newsCommentResponse.setVote(commentContent.vote);
                    newsCommentResponse.setAgainst(commentContent.against);
                    newsCommentResponse.setContent(commentContent.content);
                    newsCommentResponse.setShare(commentContent.shareCount);
                    newsCommentResponse.setTime(DateUtil.parse(commentContent.createTime, DateFormatEnum.DATETIME));
                    const memberResponse = new UserResponse();
                    memberResponse.setAvatar(commentContent.user.avatar);
                    memberResponse.setUserName(commentContent.user.nickname);
                    memberResponse.setSourceUserId(commentContent.user.userId);
                    memberResponse.setSourceWeb("net");
                    memberResponse.setSourceEntrance("comment");
                    newsCommentResponse.setUser(memberResponse);
                    newsCommentResponseList.push(newsCommentResponse);
                }
                if (counts < 30) {
                    hasNextPage = false;
                }
            } catch (e) {
                hasNextPage = false;
            }
            offset += 30;
        }
        return newsCommentResponseList;
    }
}
