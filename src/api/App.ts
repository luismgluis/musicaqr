import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

import firebaseConfig from "../firebaseConfig";
import Database from "./database/Database";
import User from "../classes/User";
import utils from "../libs/utils/utils";

const TAG = "APP";
class App {
  private _me: firebase.User | null;
  private _fireProject: firebase.app.App | null;
  // private _onUserChangeCallBack: (user: firebase.User | null) => void;
  private _databaseFns: Database | null;
  static instance: any;
  constructor() {
    this._me = null;
    this._fireProject = null;

    this._databaseFns = null;
    if (typeof App.instance === "object") {
      return App.instance;
    }
    App.instance = this;
    if (firebase.apps.length === 0 || this._fireProject === null) {
      this._fireProject = firebase.initializeApp(firebaseConfig);
    }
  }

  public get databaseFns(): Database {
    return this._databaseFns!;
  }

  public set databaseFns(v: Database) {
    this._databaseFns = v;
  }

  database() {
    return this._fireProject?.firestore()!;
  }
  auth() {
    return this._fireProject?.auth()!;
  }
  storage() {
    return this._fireProject?.storage()!;
  }
  functions(region: any = undefined) {
    this._fireProject?.functions().useEmulator("localhost", 5001);
    return this._fireProject?.functions(region)!;
  }
  me() {
    return this._me;
  }
  getCurrentUser(callBack: (user: firebase.User | null) => void) {
    const that = this;

    const subs = that.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user is logged");
        that._me = user;
        callBack(user);
        return;
      }
      that._me = null;
      callBack(null);
    });
    return subs;
  }

  loginWithGoogle() {
    const that = this;

    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth().languageCode = "es";
    const saveInfo = (user: User, resolve: any, reject: any) => {
      that.databaseFns.user
        .saveUser(user)
        .then((result) => {
          resolve(user.id);
        })
        .catch((err) => {
          reject(err);
        });
    };
    const setPersistence = (
      resolve: (val: boolean) => void,
      reject: (err: string) => void
    ) => {
      this.auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return this.auth()
            .signInWithPopup(provider)
            .then((result) => {
              console.log(TAG, result);
              const credential = result.credential;
              if (credential !== null) {
                console.log(TAG, credential);
                const userData = result.user;
                if (userData) {
                  const user = new User({
                    id: userData.uid + "",
                    name: userData.displayName + "",
                    email: `${userData.email}`.toLowerCase(),
                    creationDate: utils.dates.dateNowUnix(),
                  });
                  saveInfo(user, resolve, reject);
                  return;
                }
              }
              resolve(false);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(TAG, errorCode, errorMessage);
              reject(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(TAG, errorCode, errorMessage);
          reject(errorMessage);
        });
    };
    return new Promise<boolean>((resolve, reject) => {
      try {
        setPersistence(resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
  loginWithEmail(email: string, password: string) {
    return new Promise<string | null>((resolve, reject) => {
      try {
        this.auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            if (user) {
              resolve(user.uid);
              return;
            }
            reject(null);
            console.log(TAG, user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(errorMessage + " " + errorCode);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  logOut() {
    return this.auth().signOut();
  }
}
export default App;
