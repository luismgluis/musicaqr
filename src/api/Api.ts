import User from "../classes/User";
import ApiStorage from "./ApiStorage";
import App from "./App";
import Database from "./database/Database";
export type FireDoc =
  firebase.default.firestore.QueryDocumentSnapshot<firebase.default.firestore.DocumentData> | null;

export type FireRef =
  firebase.default.firestore.DocumentReference<firebase.default.firestore.DocumentData> | null;

// firebase.default.firestore.DocumentReference<firebase.default.firestore.DocumentData> | null;

class Api {
  private _app: App | null;
  private _database: Database | null;
  private _storage: ApiStorage | null;
  private _currentUser: User | null;
  static instance: any;

  constructor() {
    this._database = null;
    this._app = null;
    this._currentUser = null;
    this._storage = null;
    if (typeof Api.instance === "object") {
      return Api.instance;
    }
    Api.instance = this;
    this.start();
  }
  private start() {
    this._app = new App();
    this._database = new Database(this._app);
    this._storage = new ApiStorage(this.app);
    this._app.databaseFns = this._database;
  }

  public get app(): App {
    if (!this._app) this.start();
    return this._app!;
  }

  public get database(): Database {
    if (!this._database) this.start();
    return this._database!;
  }
  public get storage(): ApiStorage {
    if (!this._storage) this.start();
    return this._storage!;
  }
  public get currentUser(): User {
    if (!this._currentUser) return new User(null);
    return this._currentUser;
  }
}
export default new Api();
