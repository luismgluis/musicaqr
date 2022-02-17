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
const IpRange_1 = require("../../classes/IpRange");
const utils_1 = require("../../libs/utils/utils");
const Business_1 = require("../../types/Business");
const TAG = "FIRE DATABASE USER";
class FireDatabaseBusiness {
    constructor(app) {
        this.app = app;
        this.allBusiness = {};
    }
    removeIpRange(business, ipRange) {
        const that = this;
        const save = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield that.app
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
        });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resSave = yield save();
                if (!resSave) {
                    reject("fail to save data on ipRange colletion");
                    return;
                }
                resolve(true);
            }
            catch (error) {
                reject(null);
            }
        }));
    }
    saveIpRange(business, ipRange) {
        const that = this;
        const save = () => __awaiter(this, void 0, void 0, function* () {
            ipRange.creationDate = utils_1.default.dates.dateNowUnix();
            const res = yield that.app
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
        });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resSave = yield save();
                if (!resSave) {
                    reject("fail to save data on ipRange colletion");
                    return;
                }
                resolve(true);
            }
            catch (error) {
                reject(null);
            }
        }));
    }
    getIpRangesListener(business, callback) {
        const that = this;
        const db = that.app.database();
        const unsubs = db
            .collection("business")
            .doc(business.id)
            .collection("ipranges")
            .onSnapshot((result) => {
            if (!result.empty) {
                const arr = [];
                result.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    arr.push(new IpRange_1.default(data));
                });
                callback(arr);
                return;
            }
            callback([]);
        }, (err) => callback([]));
        return unsubs;
    }
    getBusinessBySerial(serial) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            const db = this.app.database();
            return new Promise((resolve, reject) => {
                try {
                    db.collection("business")
                        .where("serial", "==", serial)
                        .limit(1)
                        .get()
                        .then((result) => {
                        const arr = [];
                        if (!result.empty) {
                            result.forEach((doc) => {
                                const data = doc.data();
                                data.id = doc.id;
                                arr.push(new Business_1.default(data, false));
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
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    getBusiness(idBusiness) {
        const that = this;
        const db = this.app.database();
        return new Promise((resolve, reject) => {
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
                        const data = doc.data();
                        data.id = doc.id;
                        const business = new Business_1.default(data);
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
            }
            catch (error) {
                reject(error);
            }
        });
    }
    saveBusiness(me, business) {
        const that = this;
        const save = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield that.app
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
        });
        const saveOnMe = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield that.app
                .database()
                .collection("users")
                .doc(me.id)
                .collection("business")
                .doc(business.id)
                .set({ creationDate: utils_1.default.dates.dateNowUnix() })
                .then(() => true)
                .catch((err) => {
                console.log(err);
                return null;
            });
            return res;
        });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resSave = yield save();
                if (!resSave) {
                    reject("fail to save data on business colletion");
                    return;
                }
                const resSaveOnMe = yield saveOnMe();
                if (resSaveOnMe) {
                    resolve(true);
                    return;
                }
                reject("Fail on add to me business");
            }
            catch (error) {
                reject(null);
            }
        }));
    }
    modifyBusiness(business) {
        const that = this;
        const save = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield that.app
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
        });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resSave = yield save();
                if (resSave) {
                    resolve(true);
                    return;
                }
                reject("Fail on add to me business");
            }
            catch (error) {
                reject(null);
            }
        }));
    }
    removeBusiness(me, business) {
        const that = this;
        const remove = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield that.app
                .database()
                .collection("business")
                .doc(business.id)
                .delete()
                .then(() => true)
                .catch(() => null);
            return res;
        });
        const removeOnUser = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield that.app
                .database()
                .collection("users")
                .doc(me.id)
                .collection("business")
                .doc(business.id)
                .delete()
                .then(() => true)
                .catch(() => null);
            return res;
        });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resAction = yield remove();
                yield removeOnUser();
                if (resAction) {
                    resolve(true);
                    return;
                }
                reject("Fail on remove this business");
            }
            catch (error) {
                reject(null);
            }
        }));
    }
}
exports.default = FireDatabaseBusiness;
//# sourceMappingURL=FireDatabaseBusiness.js.map