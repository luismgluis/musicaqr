"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../libs/utils/utils");
class Business {
    constructor(data, isNull) {
        this.name = (data === null || data === void 0 ? void 0 : data.name) || "";
        this.id = (data === null || data === void 0 ? void 0 : data.id) || "";
        this.at = (data === null || data === void 0 ? void 0 : data.at) || "";
        this.email = (data === null || data === void 0 ? void 0 : data.email) || "";
        this.description = (data === null || data === void 0 ? void 0 : data.description) || "";
        this.isNull = isNull || false; // check if Business has not initialized
        this.urlImg = (data === null || data === void 0 ? void 0 : data.urlImg) || "";
        this.creationDate = (data === null || data === void 0 ? void 0 : data.creationDate) || 0;
    }
    get isEmpty() {
        return this.id === "";
    }
    validate() {
        if (this.name.length < 2)
            return false;
        if (!utils_1.default.validateEmail(this.email))
            return false;
        if (this.creationDate <= 0)
            return false;
        return true;
    }
    exportObject() {
        const newOb = utils_1.default.objects.cloneObject(this);
        console.log(newOb);
        return newOb;
    }
}
exports.default = Business;
//# sourceMappingURL=Business.js.map