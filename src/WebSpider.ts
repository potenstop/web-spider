/**
 *
 * 功能描述:
 *
 * @className App
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/21 14:29
 */
import { EnableAutoConfiguration, PapioApplication} from "papio";
import {CommonConstant, Bean, ComponentScan } from "papio-common";

@EnableAutoConfiguration
@ComponentScan("@controller")
@ComponentScan("@service")
@ComponentScan("@dao")
@ComponentScan("@model")
@ComponentScan("@config")
export class WebSpider {
    public static main(): void {
        PapioApplication.run(WebSpider, process.env);
    }
    @Bean(CommonConstant.START_ARGS)
    public startArgs(): object {
        return {port: 3002};
    }
}
