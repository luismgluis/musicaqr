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
const Customer_1 = require("../../classes/Customer");
const utils_1 = require("../../libs/utils/utils");
const TAG = "FIRE DATABASE USER";
class FireDatabaseCustomer {
    constructor(app) {
        this.app = app;
        this.allCustomer = {};
    }
    getCustomersListener(business, callback) {
        const that = this;
        const db = that.app.database();
        const unsubs = db
            .collection("business")
            .doc(business.id)
            .collection("customers")
            .onSnapshot((result) => {
            if (!result.empty) {
                const arr = [];
                result.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    data.idDoc = doc.id;
                    arr.push(new Customer_1.default(data));
                });
                callback(arr);
                return;
            }
            console.log(business);
            callback([]);
        }, (err) => {
            console.log(err);
            callback([]);
        });
        return unsubs;
    }
    getCustomer(cBusiness, idCustomer) {
        const that = this;
        const db = this.app.database();
        return new Promise((resolve, reject) => {
            try {
                if (typeof that.allCustomer[idCustomer] !== "undefined") {
                    const data = that.allCustomer[idCustomer];
                    if (data instanceof Customer_1.default) {
                        if (!data.isEmpty) {
                            resolve(data);
                        }
                    }
                    return;
                }
                db.collection("business")
                    .doc(cBusiness.id)
                    .collection("customers")
                    .doc(idCustomer)
                    .get()
                    .then((result) => {
                    if (result.exists) {
                        const data = result.data();
                        data.id = result.id;
                        const customer = new Customer_1.CustomerSelenium(data, that.app, result);
                        that.allCustomer[idCustomer] = customer;
                        resolve(customer);
                        return;
                    }
                    reject("Not user");
                })
                    .catch((err) => {
                    console.log("catch", err);
                    reject(err);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getCustomerSelenium(cBusiness, idCustomer) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = (yield this.getCustomer(cBusiness, idCustomer));
            return customer;
        });
    }
    saveCustomer(business, customer) {
        const that = this;
        const saveOnMe = () => __awaiter(this, void 0, void 0, function* () {
            customer.creationDate = utils_1.default.dates.dateNowUnix();
            const res = yield that.app
                .database()
                .collection("business")
                .doc(business.id)
                .collection("customers")
                .add(customer.exportObject())
                .then((doc) => doc)
                .catch(() => null);
            return res;
        });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resSaveOnMe = yield saveOnMe();
                if (resSaveOnMe) {
                    customer.id = resSaveOnMe.id;
                    resolve(customer);
                    return;
                }
                reject("Fail on add Customer");
            }
            catch (error) {
                reject(null);
            }
        }));
    }
    modifyCustomer(business, customer) {
        const that = this;
        const save = () => __awaiter(this, void 0, void 0, function* () {
            const dataUpload = customer.exportObject();
            const res = yield that.app
                .database()
                .collection("business")
                .doc(business.id)
                .collection("customers")
                .doc(customer.id)
                .set(dataUpload)
                .then(() => true)
                .catch((err) => {
                return err;
            });
            if (res) {
                return true;
            }
            return null;
        });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resSave = yield save();
                if (resSave) {
                    resolve(true);
                    return;
                }
                reject("Fail on add to me Customer");
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    removeCustomer(business, customer) {
        const that = this;
        const remove = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield that.app
                .database()
                .collection("business")
                .doc(business.id)
                .collection("customers")
                .doc(customer.id)
                .delete()
                .then(() => true)
                .catch(() => null);
            return res;
        });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resAction = yield remove();
                if (resAction) {
                    resolve(true);
                    return;
                }
                reject("Fail on remove this Customer");
            }
            catch (error) {
                reject(null);
            }
        }));
    }
}
exports.default = FireDatabaseCustomer;
//# sourceMappingURL=FireDatabaseCustomer.js.map