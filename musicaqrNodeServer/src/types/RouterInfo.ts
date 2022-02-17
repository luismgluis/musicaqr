import { SeleniumStep } from "../actions/seleniumActions";
import { FireDoc } from "./types";

class RouterInfo {
  private doc: FireDoc;
  image: string;
  name: string;
  reference: string;
  wifiChangeStepsJson: string;
  constructor(doc: FireDoc) {
    this.doc = doc;
    const data = doc.data();
    this.image = data?.image || "";
    this.name = data?.name || "";
    this.reference = data?.reference || "";
    this.wifiChangeStepsJson = data?.wifiChangeStepsJson || "";
  }
  getSteps() {
    try {
      // const tenda = tenda2;
      // const tendajson = JSON.parse(tenda);
      // console.log(tendajson);
      const data: Array<SeleniumStep> = JSON.parse(this.wifiChangeStepsJson);
      if (!data) {
        console.error("Fail parse data from database");
      }
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
export default RouterInfo;
