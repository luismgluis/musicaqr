"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const RouterDevice_1 = require("../../classes/RouterDevice");
const utils_1 = require("../../libs/utils/utils");
class FireDatabaseRouters {
    constructor(app) {
        this.app = app;
        this.allUsers = {};
    }
    getRouter(id) {
        const that = this;
        return new Promise((resolve, reject) => {
            try {
                that.app
                    .database()
                    .collection("routers")
                    .doc(id).get()
                    .then((res) => {
                    const data = res.data();
                    resolve(new RouterDevice_1.default(data));
                })
                    .catch((err) => {
                    reject(err);
                });
            }
            catch (error) {
                reject(null);
            }
        });
    }
    saveRouter(router) {
        const that = this;
        return new Promise((resolve, reject) => {
            try {
                router.creationDate = utils_1.default.dates.dateNowUnix();
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
            }
            catch (error) {
                reject(null);
            }
        });
    }
    modifyRouter(router) {
        const that = this;
        return new Promise((resolve, reject) => {
            try {
                router.creationDate = utils_1.default.dates.dateNowUnix();
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
            }
            catch (error) {
                reject(null);
            }
        });
    }
    deleteRouter(router) {
        const that = this;
        return new Promise((resolve, reject) => {
            try {
                router.creationDate = utils_1.default.dates.dateNowUnix();
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
            }
            catch (error) {
                reject(null);
            }
        });
    }
    getRoutersListener(callBack) {
        const that = this;
        const db = this.app.database();
        let allData = [];
        const unsubs = db
            .collection("routers")
            .orderBy("creationDate", "asc")
            .onSnapshot((result) => __awaiter(this, void 0, void 0, function* () {
            if (!result.empty) {
                const arr = [];
                result.forEach((item) => {
                    const data = item.data();
                    data.id = item.id;
                    arr.push(new RouterDevice_1.default(data));
                });
                allData = arr;
                callBack(arr);
                return;
            }
            callBack([]);
        }), (err) => {
            callBack(allData);
        });
        return unsubs;
    }
    bankLoginsListener(business, callBack) {
        const that = this;
        const db = that.app.database();
        let allData = [];
        const unsubs = db
            .collection("business")
            .doc(business.id)
            .collection("bankLogin")
            .orderBy("creationDate", "asc")
            .onSnapshot((result) => __awaiter(this, void 0, void 0, function* () {
            if (!result.empty) {
                const arr = [];
                result.forEach((item) => {
                    const data = item.data();
                    data.id = item.id;
                    arr.push(new RouterDevice_1.RouterBankLogin(data));
                });
                allData = arr;
                callBack(arr);
                return;
            }
            callBack([]);
        }), (err) => {
            callBack(allData);
        });
        return unsubs;
    }
    saveBankLogin(business, bankLogin) {
        const that = this;
        return new Promise((resolve, reject) => {
            try {
                bankLogin.creationDate = utils_1.default.dates.dateNowUnix();
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
            }
            catch (error) {
                reject(null);
            }
        });
    }
    deleteBankLogin(business, bankLogin) {
        const that = this;
        return new Promise((resolve, reject) => {
            try {
                bankLogin.creationDate = utils_1.default.dates.dateNowUnix();
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
            }
            catch (error) {
                reject(null);
            }
        });
    }
}
exports.default = FireDatabaseRouters;
//# sourceMappingURL=FireDatabaseRouters.js.map