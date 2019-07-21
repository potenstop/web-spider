/**
 *
 * 功能描述:
 *
 * @className RestTestHttpConfiguration
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/14 10:19
 */
import { RestDataSource, Bean, Configuration, MapperScan } from "papio-common";
@Configuration
@MapperScan("@dao/api")
export class WebApiConfiguration {
  @Bean
  public HttpApiConfigurationMaster() {
    const httpDataSource = new RestDataSource();
    httpDataSource.setName("master");
    httpDataSource.setReadOnly(false);
    httpDataSource.setUrl("http://127.0.0.1:8080");
    httpDataSource.build();
    return httpDataSource;
  }
}
