import utils from "../libs/utils/utils";
import { SeleniumStep } from "./../actions/seleniumActions"
export type RoutersDeviceInterface = {
  id: string;
  description: string;
  urlImg: string;
  name: string;
  reference: string;
  creationDate: number;
  wifiChangeStepsJson: string;
  analyzeRouterType: string;
};
export default class RouterDevice implements RoutersDeviceInterface {
  id: string;
  description: string;
  urlImg: string;
  name: string;
  reference: string;
  creationDate: number;
  wifiChangeStepsJson: string;
  analyzeRouterType: string;
  constructor(data: RoutersDeviceInterface | null) {
    this.id = data?.id || "";
    this.description = data?.description || "";
    this.urlImg = data?.urlImg || "";
    this.name = data?.name || "";
    this.reference = data?.reference || "";
    this.wifiChangeStepsJson = data?.wifiChangeStepsJson || "";
    this.creationDate = data?.creationDate || 0;
    this.analyzeRouterType = data?.analyzeRouterType || "";
  }

  public get isEmpty(): boolean {
    return this.id === "" && this.name === "";
  }
  getSteps() {
    try {
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

  exportObject() {
    const newOb = utils.objects.cloneObject(this);
    console.log(newOb);
    return newOb;
  }
}


export type RouterBankLoginInterface = {
  id: string;
  user: string;
  password: string;
  creationDate: number;
};
export class RouterBankLogin implements RouterBankLoginInterface {
  id: string;
  user: string;
  password: string;
  creationDate: number;
  constructor(data: RouterBankLoginInterface | null) {
    this.id = data?.id || "";
    this.user = data?.user || "";
    this.password = data?.password || "";
    this.creationDate = data?.creationDate || 0;
  }
  public get isEmpty(): boolean {
    return this.id === "" && this.password === "";
  }
  exportObject() {
    const newOb = utils.objects.cloneObject(this);
    console.log(newOb);
    return newOb;
  }
}
