/**
 *
 * 功能描述:
 *
 * @className EnvConfig
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/7/17 12:37
 */
import {Configuration} from "papio";

@Configuration
export class EnvConfig {
    private chromePath: string = process.env.CHROME_PATH;
    public getChromePath(): string {
        if (!this.chromePath) {
            return "D:\\install\\chrome-win\\chrome.exe";
        }
        return this.chromePath;
    }
    public setChromePath(chromePath: string): void {
        this.chromePath = chromePath;
    }
}
