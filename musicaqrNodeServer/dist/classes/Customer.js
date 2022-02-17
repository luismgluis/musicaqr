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
exports.CustomerSelenium = void 0;
const utils_1 = require("../libs/utils/utils");
const ping = require("ping");
const node_fetch_1 = require("node-fetch");
class Customer {
    constructor(data, isNull) {
        this.name = (data === null || data === void 0 ? void 0 : data.name) || "";
        this.id = (data === null || data === void 0 ? void 0 : data.id) || "";
        this.email = (data === null || data === void 0 ? void 0 : data.email) || "";
        this.lastName = (data === null || data === void 0 ? void 0 : data.lastName) || "";
        this.ip = (data === null || data === void 0 ? void 0 : data.ip) || "";
        this.router = (data === null || data === void 0 ? void 0 : data.router) || "";
        this.idCard = (data === null || data === void 0 ? void 0 : data.idCard) || "";
        this.routerUser = (data === null || data === void 0 ? void 0 : data.routerUser) || "";
        this.routerPass = (data === null || data === void 0 ? void 0 : data.routerPass) || "";
        this.appUser = (data === null || data === void 0 ? void 0 : data.appUser) || "";
        this.appPass = (data === null || data === void 0 ? void 0 : data.appPass) || "";
        this.isNull = isNull || false; // check if Customer has not initialized
        this.creationDate = (data === null || data === void 0 ? void 0 : data.creationDate) || 0;
        this.idDoc = (data === null || data === void 0 ? void 0 : data.idDoc) || "";
    }
    uploadFromOther(otherCustomer) {
        utils_1.default.objects.uploadObjFromObj(this, otherCustomer);
    }
    get isEmptyTotal() {
        return this.id === "" || this.id !== this.idDoc;
    }
    get isEmpty() {
        return this.id === "";
    }
    exportObject() {
        const newOb = utils_1.default.objects.cloneObject(this, true);
        console.log(newOb);
        return newOb;
    }
}
exports.default = Customer;
class CustomerSelenium extends Customer {
    constructor(data, app, fireDoc) {
        super(data, false);
        this.app = app;
        this._fireDoc = fireDoc;
        this.completeWifiChange = false;
    }
    get seleniumActions() {
        return this.app.seleniumActions;
    }
    get fireDoc() {
        return this._fireDoc;
    }
    getIpUrl() {
        const that = this;
        let myip = that.ip;
        if (!myip.includes("http"))
            myip = "http://" + myip;
        return myip;
    }
    setCompleteWifiChange(change, yesNo, result) {
        const that = this;
        return new Promise((resolve, reject) => {
            try {
                if (typeof yesNo !== "boolean") {
                    resolve(false);
                }
                if (!change.fireDoc) {
                    resolve(false);
                }
                change.fireDoc.ref
                    .update({ complete: yesNo, result: result })
                    .then(() => {
                    resolve(true);
                });
            }
            catch (error) {
                reject(null);
            }
        });
    }
    getMyRouterInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            try {
                const router = yield that.app.api.routers.getRouter(that.router);
                if (router) {
                    return router;
                }
                return null;
            }
            catch (error) {
                console.log(error, "customer on getmyrouterinfo");
                return null;
            }
        });
    }
    hasPing(host = "") {
        const that = this;
        if (host === "")
            host = this.ip;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                ping.sys.probe(host, function (isAlive) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const hasFetch = yield that.hasFetch();
                        if (hasFetch) {
                            resolve(true);
                            return;
                        }
                        resolve(false);
                    });
                });
            }
            catch (error) {
                console.log(error, "customer hasping");
                reject(error);
            }
        }));
    }
    hasFetch(url = "") {
        if (url === "")
            url = this.ip;
        return new Promise((resolve, reject) => {
            try {
                if (!url.includes("http")) {
                    url = "http://" + url;
                }
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 1000 * 5);
                (0, node_fetch_1.default)(url, { signal: controller.signal })
                    .then((response) => __awaiter(this, void 0, void 0, function* () {
                    const json = yield response.text();
                    if (json) {
                        resolve(true);
                        return;
                    }
                    resolve(false);
                }))
                    .catch((err) => {
                    console.log(err);
                    resolve(false);
                })
                    .finally(() => {
                    clearTimeout(timeoutId);
                });
            }
            catch (error) {
                console.log(error);
                resolve(false);
            }
        });
    }
    changeWifiPassword(change, onlyCheck = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            let continueAll = true;
            let result = {
                state: true,
                value: null,
            };
            if (that.router === "") {
                result.state = false;
                result.value = "WITHOUT-ROUTER";
                return result;
            }
            if (onlyCheck === null) {
                yield that.getRouterInfo();
            }
            if (onlyCheck === "changeWifi") {
                that.seleniumActions.clean();
            }
            const actions = that.seleniumActions;
            const router = yield that.getMyRouterInfo();
            const steps = router.getSteps();
            if (steps.length === 0) {
                result.state = false;
                return result;
            }
            for (const step of steps) {
                if (!continueAll)
                    break;
                let stepValue = "";
                let stepAction = "click";
                switch (step.action) {
                    case "navigate":
                        stepValue = that.getIpUrl() + (step.domElement || "");
                        stepAction = "navigate";
                        break;
                    case "inputUserLogin":
                        stepValue = that.routerUser;
                        stepAction = "setInputValue";
                        break;
                    case "inputPasswordLogin":
                        stepValue = that.routerPass;
                        stepAction = "setInputValue";
                        break;
                    case "setNewWifiName":
                        stepValue = change.wifiUser;
                        stepAction = "setInputValue";
                        break;
                    case "setNewWifiPassword":
                        stepValue = change.wifiPassword;
                        stepAction = "setInputValue";
                        break;
                    case "getCurrentWifiPassword":
                        stepValue = "";
                        stepAction = "getInputValue";
                        break;
                    case "await":
                        stepValue = "";
                        stepAction = "await";
                        break;
                    case "click":
                        stepValue = "";
                        stepAction = "click";
                        break;
                    case "stopOnLogin":
                        stepValue = "";
                        stepAction = "await";
                        if (onlyCheck === "login") {
                            continueAll = false;
                        }
                        break;
                    case "alert":
                        stepValue = step.script;
                        stepAction = "alert";
                        break;
                    case "changeFrame":
                        stepValue = step.script;
                        stepAction = "changeFrame";
                        break;
                    default:
                        continue;
                }
                //execute action
                let script = "";
                if (step.domElement) {
                    script = `return document.querySelector("${step.domElement}")`;
                }
                else {
                    script = step.script || "";
                }
                try {
                    result = yield actions.execute(stepAction, script, stepValue);
                    if (step.action === "stopOnLogin" &&
                        onlyCheck === "login" &&
                        result.state) {
                        result.state = true;
                        return result;
                    }
                    if (!result.state) {
                        continueAll = false;
                    }
                }
                catch (error) {
                    console.log(error);
                    continueAll = false;
                }
            }
            return result;
        });
    }
    getLoginCredentials() {
        const that = this;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let bankLogins = that.app.routersBankLogins;
                const oldData = {
                    user: that.routerUser,
                    password: that.routerPass,
                };
                let itsOk = false;
                for (const login of bankLogins) {
                    that.routerUser = login.user;
                    that.routerPass = login.password;
                    const res = yield that.changeWifiPassword({
                        id: "",
                        idCustomer: that.id,
                        idCard: that.idCard,
                        wifiUser: "newUser",
                        wifiPassword: "newPassword",
                        email: "none",
                        complete: false,
                    }, "login");
                    if (res.state) {
                        itsOk = true;
                        break;
                    }
                }
                if (itsOk) {
                    resolve(true);
                    return;
                }
                that.routerUser = oldData.user;
                that.routerPass = oldData.password;
                resolve(false);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    getRouterInfo(forceAnalysis = false) {
        const that = this;
        const actions = this.app.seleniumActions;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (that.isEmpty) {
                    resolve("ok");
                    return;
                }
                let routers = that.app.deviceRouters;
                let limit = 50;
                let navigateExecuted = false;
                while (routers.length === 0 && limit > 0) {
                    yield utils_1.default.timeOut(200);
                    routers = that.app.deviceRouters;
                    limit--;
                }
                let myip = that.ip;
                const hasPing = yield that.hasFetch();
                console.log(`The IP ${myip} ping has ${hasPing}`);
                if (!hasPing) {
                    resolve("navigate-error");
                    return;
                }
                if (!myip.includes("http"))
                    myip = "http://" + myip;
                let hasNavigate = false;
                for (const key in routers) {
                    const device = routers[key];
                    const query = device.analyzeRouterType;
                    if (query !== "") {
                        if (!navigateExecuted) {
                            hasNavigate = (yield actions.execute("navigate", "", myip)).state;
                            navigateExecuted = true;
                        }
                        console.log(`The IP ${myip} hasNavigate ${hasNavigate}`);
                        let hasElement = false;
                        if (hasNavigate)
                            hasElement = (yield actions.execute("searchElement", query)).state;
                        console.log(`The IP ${myip} hasElement ${hasElement}`);
                        if (hasElement && hasNavigate) {
                            try {
                                console.log(hasElement);
                                that.router = device.id;
                                yield that.app.api.customer.modifyCustomer(that.app.business, that);
                                const resultCredentials = yield that.getLoginCredentials(); // !!!
                                that.app.seleniumActions.insertGreenScreen(`Acciones en ${myip} terminadas`);
                                console.log(`The IP ${myip} resultCredentials ${resultCredentials}`);
                                if (resultCredentials) {
                                    yield that.app.api.customer.modifyCustomer(that.app.business, that);
                                }
                                resolve("ok");
                                return;
                            }
                            catch (error) {
                                console.log(error);
                            }
                        }
                    }
                }
                if (hasNavigate) {
                    resolve("without-element");
                    return;
                }
                resolve("navigate-error");
            }
            catch (error) {
                reject(null);
            }
        }));
    }
}
exports.CustomerSelenium = CustomerSelenium;
//# sourceMappingURL=Customer.js.map