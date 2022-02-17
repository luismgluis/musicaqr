"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../libs/utils/utils");
class User {
    constructor(data, isNull) {
        this.name = (data === null || data === void 0 ? void 0 : data.name) || "";
        this.id = (data === null || data === void 0 ? void 0 : data.id) || "";
        this.email = (data === null || data === void 0 ? void 0 : data.email) || "";
        this.isNull = isNull || false; // check if user has not initialized
        this.creationDate = (data === null || data === void 0 ? void 0 : data.creationDate) || 0;
        this.isSuperUser = (data === null || data === void 0 ? void 0 : data.isSuperUser) || false;
    }
    get isEmpty() {
        return this.id === "";
    }
    exportObject() {
        const newOb = utils_1.default.objects.cloneObject(this);
        console.log(newOb);
        return newOb;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map