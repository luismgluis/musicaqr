import App from "../../App";
import Business from "../../classes/Business";

import RouterDevice, { RouterBankLogin } from "../../classes/RouterDevice";

import utils from "../../libs/utils/utils";

class FireDatabaseRouters {
  private app: App;
  private allUsers: any;
  constructor(app: App) {
    this.app = app;
    this.allUsers = {};
  }
  getRouter(id:string): Promise<RouterDevice> {
    const that = this;
    return new Promise<RouterDevice>((resolve, reject) => {
      try {
        that.app
          .database()
          .collection("routers")
          .doc(id).get()
          .then((res) => {
            const data:any = res.data()
            resolve(new RouterDevice(data));
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  saveRouter(router: RouterDevice): Promise<RouterDevice> {
    const that = this;
    return new Promise<RouterDevice>((resolve, reject) => {
      try {
        router.creationDate = utils.dates.dateNowUnix();
        that.app
          .database()
          .collection("routers")
          .add(router.exportObject())
          .then((res) => {
            router.id = res.id;
            resolve(router);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  modifyRouter(router: RouterDevice): Promise<RouterDevice> {
    const that = this;
    return new Promise<RouterDevice>((resolve, reject) => {
      try {
        router.creationDate = utils.dates.dateNowUnix();
        that.app
          .database()
          .collection("routers")
          .doc(router.id)
          .set(router.exportObject())
          .then((res) => {
            resolve(router);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }

  deleteRouter(router: RouterDevice): Promise<boolean> {
    const that = this;
    return new Promise<boolean>((resolve, reject) => {
      try {
        router.creationDate = utils.dates.dateNowUnix();
        that.app
          .database()
          .collection("routers")
          .doc(router.id)
          .delete()
          .then((res) => {
            resolve(true);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  getRoutersListener(callBack: (res: RouterDevice[]) => void) {
    const that = this;
    const db = this.app.database();
    let allData: any = [];

    const unsubs = db
      .collection("routers")
      .orderBy("creationDate", "asc")
      .onSnapshot(
        async (result) => {
          if (!result.empty) {
            const arr: RouterDevice[] = [];
            result.forEach((item) => {
              const data: any = item.data();
              data.id = item.id;
              arr.push(new RouterDevice(data));
            });
            allData = arr;
            callBack(arr);
            return;
          }
          callBack([]);
        },
        (err) => {
          callBack(allData);
        }
      );

    return unsubs;
  }
  bankLoginsListener(
    business: Business,
    callBack: (res: RouterBankLogin[]) => void
  ) {
    const that = this;
    const db = that.app.database();
    let allData: any = [];

    const unsubs = db
      .collection("business")
      .doc(business.id)
      .collection("bankLogin")
      .orderBy("creationDate", "asc")
      .onSnapshot(
        async (result) => {
          if (!result.empty) {
            const arr: RouterBankLogin[] = [];
            result.forEach((item) => {
              const data: any = item.data();
              data.id = item.id;
              arr.push(new RouterBankLogin(data));
            });
            allData = arr;
            callBack(arr);
            return;
          }
          callBack([]);
        },
        (err) => {
          callBack(allData);
        }
      );

    return unsubs;
  }
  saveBankLogin(business: Business, bankLogin: RouterBankLogin) {
    const that = this;
    return new Promise<RouterBankLogin>((resolve, reject) => {
      try {
        bankLogin.creationDate = utils.dates.dateNowUnix();
        that.app
          .database()
          .collection("business")
          .doc(business.id)
          .collection("bankLogin")
          .add(bankLogin.exportObject())
          .then((res) => {
            bankLogin.id = res.id;
            resolve(bankLogin);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  deleteBankLogin(business: Business, bankLogin: RouterBankLogin) {
    const that = this;
    return new Promise<boolean>((resolve, reject) => {
      try {
        bankLogin.creationDate = utils.dates.dateNowUnix();
        that.app
          .database()
          .collection("business")
          .doc(business.id)
          .collection("bankLogin")
          .doc(bankLogin.id)
          .delete()
          .then((res) => {
            resolve(true);
          })
          .catch((err) => {
            resolve(false);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
}

export default FireDatabaseRouters;
