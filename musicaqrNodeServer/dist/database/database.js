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
const routerInfo_1 = require("../types/routerInfo");
const FireDatabaseBusiness_1 = require("./business/FireDatabaseBusiness");
const FireDatabaseCustomer_1 = require("./customer/FireDatabaseCustomer");
const FireDatabaseRouters_1 = require("./routers/FireDatabaseRouters");
class FireDatabase {
    constructor(app) {
        this.app = app;
        this.customer = new FireDatabaseCustomer_1.default(app);
        this.business = new FireDatabaseBusiness_1.default(app);
        this.routers = new FireDatabaseRouters_1.default(app);
    }
    // async getIdBusinessBySerial(serial: string): Promise<string | null> {
    //   const that = this;
    //   const app = that.app;
    //   const data = await app.firestore
    //     .collection("serials")
    //     .doc(serial)
    //     .get()
    //     .then((snap) => {
    //       if (snap.exists) return snap.data();
    //       return null;
    //     })
    //     .catch((err) => {
    //       return null;
    //     });
    //   if (data !== null) {
    //     if (typeof data.idBusiness !== "undefined") {
    //       return data.idBusiness;
    //     }
    //   }
    //   return null;
    // }
    getServiceInfo(idService) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            const app = that.app;
            const data = yield app.firestore
                .collection("business")
                .doc(app.business.id)
                .collection("services")
                .doc(idService)
                .get()
                .then((snap) => {
                if (snap.exists)
                    return snap.data();
                return null;
            })
                .catch((err) => {
                return null;
            });
            if (data !== null) {
                if (typeof data.idBusiness !== "undefined") {
                    return data.idBusiness;
                }
            }
            return null;
        });
    }
    getRouterInfo(idRouter) {
        const that = this;
        const app = that.app;
        return new Promise((resolve, reject) => {
            try {
                app.firestore
                    .collection("routers")
                    .doc(idRouter)
                    .get()
                    .then((snap) => {
                    if (snap.exists) {
                        const data = new routerInfo_1.default(snap);
                        resolve(data);
                        return;
                    }
                    reject(null);
                })
                    .catch((err) => {
                    reject(null);
                });
            }
            catch (error) {
                reject(null);
            }
        });
    }
    changeWifiLogin(wifi, password) {
        const that = this;
        const app = that.app;
        const docTest = app.firestore.collection("test").doc("a");
    }
    onWifiChangesRequest(callBack) {
        const that = this;
        const app = that.app;
        const unsubs = app.firestore
            .collection("business")
            .doc(app.business.id)
            .collection("wifiChanges")
            .where("complete", "==", false)
            .onSnapshot((snap) => __awaiter(this, void 0, void 0, function* () {
            const arrResult = [];
            const arr = [];
            snap.docs.forEach((item) => arr.push(item));
            for (const item of arr) {
                const data = item.data();
                data.id = item.id;
                data.fireDoc = item;
                const customer = yield that.customer.getCustomerSelenium(app.business, data.idCustomer);
                arrResult.push({
                    customer: customer,
                    change: data,
                });
            }
            callBack(arrResult);
        }), (err) => {
            console.log(err);
            callBack([]);
        });
        return unsubs;
        //
    }
    onRoutersAnalyzeRequest(callBack) {
        const that = this;
        const app = that.app;
        // const idBusiness = app.business.id;
        const unsubs = app.firestore
            .collection("business")
            .doc(app.business.id)
            .collection("analyzeRouters")
            .where("state", "==", "started")
            .onSnapshot((snap) => __awaiter(this, void 0, void 0, function* () {
            const arr = [];
            snap.docs.forEach((item) => {
                const data = item.data();
                data.doc = item;
                arr.push(data);
            });
            const arrPlus = [];
            for (const testRouter of arr) {
                const customer = yield that.app.api.customer.getCustomer(app.business, testRouter.idCustomer);
                arrPlus.push({
                    customer: customer,
                    state: testRouter.state,
                    creator: testRouter.creator,
                    updateTestDoc: (data) => {
                        var _a;
                        const dataUpdated = {
                            state: data.state,
                            idCustomer: data.idCustomer,
                            creator: data.creator,
                        };
                        (_a = testRouter.doc) === null || _a === void 0 ? void 0 : _a.ref.set(dataUpdated);
                    },
                });
            }
            callBack(arrPlus);
        }), (err) => {
            console.log(err);
            callBack([]);
        });
        return unsubs;
        //
    }
}
exports.default = FireDatabase;
//# sourceMappingURL=database.js.map