"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterBankLogin = void 0;
const utils_1 = require("../libs/utils/utils");
class RouterDevice {
    constructor(data) {
        this.id = (data === null || data === void 0 ? void 0 : data.id) || "";
        this.description = (data === null || data === void 0 ? void 0 : data.description) || "";
        this.urlImg = (data === null || data === void 0 ? void 0 : data.urlImg) || "";
        this.name = (data === null || data === void 0 ? void 0 : data.name) || "";
        this.reference = (data === null || data === void 0 ? void 0 : data.reference) || "";
        this.wifiChangeStepsJson = (data === null || data === void 0 ? void 0 : data.wifiChangeStepsJson) || "";
        this.creationDate = (data === null || data === void 0 ? void 0 : data.creationDate) || 0;
        this.analyzeRouterType = (data === null || data === void 0 ? void 0 : data.analyzeRouterType) || "";
    }
    get isEmpty() {
        return this.id === "" && this.name === "";
    }
    getSteps() {
        try {
            const data = JSON.parse(this.wifiChangeStepsJson);
            if (!data) {
                console.error("Fail parse data from database");
            }
            return data;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
    exportObject() {
        const newOb = utils_1.default.objects.cloneObject(this);
        console.log(newOb);
        return newOb;
    }
}
exports.default = RouterDevice;
class RouterBankLogin {
    constructor(data) {
        this.id = (data === null || data === void 0 ? void 0 : data.id) || "";
        this.user = (data === null || data === void 0 ? void 0 : data.user) || "";
        this.password = (data === null || data === void 0 ? void 0 : data.password) || "";
        this.creationDate = (data === null || data === void 0 ? void 0 : data.creationDate) || 0;
    }
    get isEmpty() {
        return this.id === "" && this.password === "";
    }
    exportObject() {
        const newOb = utils_1.default.objects.cloneObject(this);
        console.log(newOb);
        return newOb;
    }
}
exports.RouterBankLogin = RouterBankLogin;
//# sourceMappingURL=RouterDevice.js.map