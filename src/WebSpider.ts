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
import { Bean, ComponentScan } from "papio";
import {PapioApollo} from "papio-apollo";
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
    @Bean("papioApollo")
    public loadApollo() {
        return PapioApollo.start();
    }
}
