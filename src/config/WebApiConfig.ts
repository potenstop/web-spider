/**
 *
 * 功能描述:
 *
 * @className WebApiConfig
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/8/2 12:36
 */
import {Bean, Configuration, MapperScan, RestDataSource} from "papio-common";
import {Value} from "papio-apollo/lib/annotation/Value";

@Configuration
@MapperScan("@dao/web")
export class WebApiConfig {
    @Value("web.spider.api.url")
    private url: string;

    public getUrl(): string {
        return this.url;
    }
    @Bean
    public restTestDataSourceMaster() {
        const httpDataSource = new RestDataSource();
        httpDataSource.setName("master");
        httpDataSource.setReadOnly(false);
        console.log(global)
        console.log(this.getUrl());
        httpDataSource.setUrl(this.getUrl());
        httpDataSource.build();
        return httpDataSource;
    }
}
