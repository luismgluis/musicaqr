import { FireDoc } from "./types";

class BusinessServices {
  _fireDoc: FireDoc;
  id: string;
  idCard: string;

  name: string;
  password: string;
  phone: string;

  constructor(fireDoc: FireDoc) {
    this._fireDoc = fireDoc;
    const data = fireDoc.data();
    this.id = fireDoc.id;
    this.name = data?.name || "";
    this.password = data?.name || "";
    this.phone = data?.name || "";
    this.idCard = data?.name || "";
  }
}
export default BusinessServices;
