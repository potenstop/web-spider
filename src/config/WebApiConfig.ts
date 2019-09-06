/**
 *
 * 功能描述:
 *
 * @className WebApiConfig
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/8/2 12:36
 */
import {Autowired, Bean, Configuration, MapperScan, RestDataSource} from "papio";
import {Value} from "papio-apollo/lib/annotation/Value";
import {ApolloConfig} from "./ApolloConfig";

@Configuration
@MapperScan("@dao/client")
export class WebApiConfig {
    @Value("web.spider.api.url")
    private webSpiderApiUrl: string;

    private getWebSpiderApiUrl() {
        return this.webSpiderApiUrl;
    }
    @Bean
    public restTestDataSourceMaster() {
        const httpDataSource = new RestDataSource();
        httpDataSource.setName("master");
        httpDataSource.setReadOnly(false);
        httpDataSource.setUrl(this.getWebSpiderApiUrl());
        httpDataSource.build();
        return httpDataSource;
    }
}
