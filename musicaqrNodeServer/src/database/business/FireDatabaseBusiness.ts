import App from "../../App";
import IpRange from "../../classes/IpRange";
import User from "../../classes/User";
import utils from "../../libs/utils/utils";
import Business from "../../types/Business";

const TAG = "FIRE DATABASE USER";
class FireDatabaseBusiness {
  private app: App;
  private allBusiness: any;
  constructor(app: App) {
    this.app = app;
    this.allBusiness = {};
  }
  removeIpRange(business: Business, ipRange: IpRange) {
    const that = this;
    const save = async () => {
      const res = await that.app
        .database()
        .collection("business")
        .doc(business.id)
        .collection("ipranges")
        .doc(ipRange.id)
        .delete()
        .then((res) => true)
        .catch((err) => {
          console.log(err);
          return null;
        });
      if (res) {
        return true;
      }
      return null;
    };
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const resSave = await save();
        if (!resSave) {
          reject("fail to save data on ipRange colletion");
          return;
        }
        resolve(true);
      } catch (error) {
        reject(null);
      }
    });
  }
  saveIpRange(business: Business, ipRange: IpRange) {
    const that = this;
    const save = async () => {
      ipRange.creationDate = utils.dates.dateNowUnix();
      const res = await that.app
        .database()
        .collection("business")
        .doc(business.id)
        .collection("ipranges")
        .add(ipRange.exportObject())
        .then((res) => res)
        .catch(() => null);
      if (res) {
        ipRange.id = res.id;
        return true;
      }
      return null;
    };
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const resSave = await save();
        if (!resSave) {
          reject("fail to save data on ipRange colletion");
          return;
        }
        resolve(true);
      } catch (error) {
        reject(null);
      }
    });
  }
  getIpRangesListener(business: Business, callback: (res: IpRange[]) => void) {
    const that = this;
    const db = that.app.database();
    const unsubs = db
      .collection("business")
      .doc(business.id)
      .collection("ipranges")
      .onSnapshot(
        (result) => {
          if (!result.empty) {
            const arr: IpRange[] = [];
            result.forEach((doc) => {
              const data: any = doc.data();
              data.id = doc.id;
              arr.push(new IpRange(data));
            });
            callback(arr);
            return;
          }
          callback([]);
        },
        (err) => callback([])
      );
    return unsubs;
  }
  async getBusinessBySerial(serial: string) {
    const that = this;
    const db = this.app.database();
    return new Promise<Business>((resolve, reject) => {
      try {
        db.collection("business")
          .where("serial", "==", serial)
          .limit(1)
          .get()
          .then((result) => {
            const arr: any[] = [];
            if (!result.empty) {
              result.forEach((doc) => {
                const data = <any>doc.data();
                data.id = doc.id;
                arr.push(new Business(data, false));
              });
            }
            if (arr.length > 0) {
              resolve(arr[0]);
              return;
            }
            reject("Not user");
          })
          .catch((err) => {
            console.log("catch", err);
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  getBusiness(idBusiness: string) {
    const that = this;
    const db = this.app.database();
    return new Promise<Business>((resolve, reject) => {
      try {
        if (typeof that.allBusiness[idBusiness] !== "undefined") {
          resolve(that.allBusiness[idBusiness]);
          return;
        }
        db.collection("business")
          .doc(idBusiness)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const data: any = doc.data();
              data.id = doc.id;
              const business = new Business(data);
              that.allBusiness[idBusiness] = business;
              resolve(business);
              return;
            }
            reject("Not user");
          })
          .catch((err) => {
            console.log("catch", err);
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  saveBusiness(me: User, business: Business) {
    const that = this;
    const save = async () => {
      const res = await that.app
        .database()
        .collection("business")
        .add(business.exportObject())
        .catch((err) => {
          console.log(err);
          return null;
        });
      if (res) {
        business.id = res.id;
        return true;
      }
      return null;
    };
    const saveOnMe = async () => {
      const res = await that.app
        .database()
        .collection("users")
        .doc(me.id)
        .collection("business")
        .doc(business.id)
        .set({ creationDate: utils.dates.dateNowUnix() })
        .then(() => true)
        .catch((err) => {
          console.log(err);
          return null;
        });
      return res;
    };
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const resSave = await save();
        if (!resSave) {
          reject("fail to save data on business colletion");
          return;
        }
        const resSaveOnMe = await saveOnMe();
        if (resSaveOnMe) {
          resolve(true);
          return;
        }
        reject("Fail on add to me business");
      } catch (error) {
        reject(null);
      }
    });
  }
  modifyBusiness(business: Business) {
    const that = this;
    const save = async () => {
      const res = await that.app
        .database()
        .collection("business")
        .doc(business.id)
        .set(business.exportObject())
        .then(() => true)
        .catch(() => null);
      if (res) {
        return true;
      }
      return null;
    };

    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const resSave = await save();
        if (resSave) {
          resolve(true);
          return;
        }
        reject("Fail on add to me business");
      } catch (error) {
        reject(null);
      }
    });
  }
  removeBusiness(me: User, business: Business) {
    const that = this;
    const remove = async () => {
      const res = await that.app
        .database()
        .collection("business")
        .doc(business.id)
        .delete()
        .then(() => true)
        .catch(() => null);
      return res;
    };
    const removeOnUser = async () => {
      const res = await that.app
        .database()
        .collection("users")
        .doc(me.id)
        .collection("business")
        .doc(business.id)
        .delete()
        .then(() => true)
        .catch(() => null);
      return res;
    };

    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const resAction = await remove();
        await removeOnUser();
        if (resAction) {
          resolve(true);
          return;
        }
        reject("Fail on remove this business");
      } catch (error) {
        reject(null);
      }
    });
  }
}

export default FireDatabaseBusiness;
