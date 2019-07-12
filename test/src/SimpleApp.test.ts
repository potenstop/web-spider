import {WebSpider} from "../../src/WebSpider";
import {LoggerFactory} from "type-slf4";

const logger = LoggerFactory.getLogger("web-spider.test.SimpleApp");
describe("test WebSpider", () => {
    it("main", () => {
        logger.info("starting");
        WebSpider.main();
    });
});
