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

@Configuration
@MapperScan("@dao/web")
export class WebApiConfig {
    @Bean
    public restTestDataSourceMaster() {
        const httpDataSource = new RestDataSource();
        httpDataSource.setName("master");
        httpDataSource.setReadOnly(false);
        httpDataSource.setUrl("http://localhost:20001");
        httpDataSource.build();
        return httpDataSource;
    }
}
