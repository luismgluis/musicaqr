import Business from "../../../classes/Business";
import User from "../../../classes/User";
import utils from "../../../libs/utils/utils";
import App from "../../App";

const TAG = "FIRE DATABASE USER";
class FireDatabaseUser {
  private app: App;
  private allUsers: any;
  private allBusiness: any;
  constructor(app: App) {
    this.app = app;
    this.allUsers = {};
    this.allBusiness = {};
  }
  saveUser(user: User): Promise<User> {
    const that = this;
    return new Promise<User>((resolve, reject) => {
      try {
        that.app
          .database()
          .collection("users")
          .doc(user.id)
          .set(user.exportObject())
          .then(() => {
            resolve(user);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  createUserWithEmail(name: string, email: string, password: string) {
    const that = this;
    const saveInfo = (uid: any, resolve: any, reject: any) => {
      const user = new User({
        id: uid,
        name: name,
        email: `${email}`.toLowerCase(),
        creationDate: utils.dates.dateNowUnix(),
      });
      that
        .saveUser(user)
        .then((result) => {
          resolve(uid);
        })
        .catch((err) => {
          reject(err);
        });
    };
    const create = (resolve: any, reject: any) => {
      this.app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          if (result !== null) {
            if (result.user) {
              saveInfo(result.user.uid, resolve, reject);
              return;
            }
          }
          reject(null);
        })
        .catch(async (err) => {
          console.log(TAG, err.code);
          const res = await that.app
            .database()
            .collection("users")
            .where("email", "==", email)
            .limit(1)
            .get();
          if (res.empty) {
            err.uid = "";
          } else {
            const s = res.docs[0];
            err.uid = s.id;
            err.user = s.data();
          }
          if (`${err.code}`.includes("email-already-in-use")) {
            err.code = "Email en uso";
          } else {
            err.code = "Error de servidor, informa a soporte.";
          }
          reject(err);
        });
    };
    return new Promise<string>((resolve, reject) => {
      try {
        create(resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
  getUser(uid: string) {
    const that = this;
    const db = this.app.database();
    return new Promise<User>((resolve, reject) => {
      try {
        if (typeof that.allUsers[uid] !== "undefined") {
          resolve(that.allUsers[uid]);
          return;
        }
        db.collection("users")
          .doc(uid)
          .get()
          .then((result) => {
            if (result.exists) {
              const data: any = result.data();
              data.id = result.id;
              const user = new User(data);
              that.allUsers[uid] = user;
              resolve(user);
              return;
            }
            reject("Not business");
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
  getUserBusiness(uid: string) {
    const that = this;
    const db = this.app.database();
    return new Promise<Business[]>((resolve, reject) => {
      try {
        db.collection("users")
          .doc(uid)
          .collection("business")
          .get()
          .then(async (result) => {
            if (!result.empty) {
              const arr: Business[] = [];
              for (const key in result.docs) {
                const element = result.docs[key];
                const idBusiness: string = element.id;
                const data = await that.app.databaseFns.business
                  .getBusiness(idBusiness)
                  .catch(() => null);
                if (data) {
                  arr.push(data);
                }
              }
              resolve(arr);
              return;
            }
            resolve([]);
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
  getUserBusinessListener(uid: string, callBack: (res: Business[]) => void) {
    const that = this;
    const db = this.app.database();
    let allData: any = [];

    const unsubs = db
      .collection("users")
      .doc(uid)
      .collection("business")
      .onSnapshot(
        async (result) => {
          if (!result.empty) {
            const arr: Business[] = [];
            for (const key in result.docs) {
              const element = result.docs[key];
              const idBusiness: string = element.id;
              const data = await that.app.databaseFns.business
                .getBusiness(idBusiness)
                .catch(() => null);
              if (data) {
                arr.push(data);
              }
            }
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
}

export default FireDatabaseUser;
