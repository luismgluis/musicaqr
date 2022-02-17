import utils from "../libs/utils/utils";

export interface IpRangeInterface {
  id: string;
  ip: string;
  range: number;
  creationDate: number;
  isNull?: boolean;
}
export default class IpRange implements IpRangeInterface {
  id: string;
  ip: string;
  range: number;
  creationDate: number;
  isNull?: boolean;
  constructor(data: IpRangeInterface | null, isNull?: boolean) {
    this.ip = data?.ip || "";
    this.id = data?.id || "";
    this.range = data?.range || 0;
    this.isNull = isNull || false; // check if IpRange has not initialized
    this.creationDate = data?.creationDate || 0;
  }
  setIp(ip: string): boolean {
    if (ip.includes("/")) {
      const newip = ip.split("/")[0];
      if (utils.validateIp(newip)) {
        try {
          const arrip = newip.split(".");
          this.ip = `${arrip[0]}.${arrip[1]}.${arrip[2]}.0`;
          this.range = Number(ip.split("/")[1]);
          return true;
        } catch (error) {}
      }
      return false;
    }
    if (utils.validateIp(ip)) {
      this.ip = ip;
      this.range = 24;
      return true;
    }
    return false;
  }
  getIpsInRange(): string[] {
    if (!utils.validateIp(this.ip)) {
      return [];
    }
    const arrip = this.ip.split(".");
    const ipLeft = `${arrip[0]}.${arrip[1]}.${arrip[2]}`;
    const arrResult: string[] = [];
    for (let index = 0; index < 255; index++) {
      arrResult.push(`${ipLeft}.${index}`);
    }
    return arrResult;
  }
  public get isEmpty(): boolean {
    return this.id === "";
  }

  exportObject() {
    const newOb = utils.objects.cloneObject(this);
    console.log(newOb);
    return newOb;
  }
}
