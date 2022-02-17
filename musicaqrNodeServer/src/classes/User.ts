import utils from "../libs/utils/utils";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  creationDate: number;
  isNull?: boolean;
  isSuperUser?: boolean;
}
export default class User implements UserInterface {
  id: string;
  name: string;
  email: string;
  creationDate: number;
  isNull?: boolean;
  isSuperUser?: boolean;
  constructor(data: UserInterface | null, isNull?: boolean) {
    this.name = data?.name || "";
    this.id = data?.id || "";
    this.email = data?.email || "";
    this.isNull = isNull || false; // check if user has not initialized
    this.creationDate = data?.creationDate || 0;
    this.isSuperUser = data?.isSuperUser || false;
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
