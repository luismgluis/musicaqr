"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessServices {
    constructor(fireDoc) {
        this._fireDoc = fireDoc;
        const data = fireDoc.data();
        this.id = fireDoc.id;
        this.name = (data === null || data === void 0 ? void 0 : data.name) || "";
        this.password = (data === null || data === void 0 ? void 0 : data.name) || "";
        this.phone = (data === null || data === void 0 ? void 0 : data.name) || "";
        this.idCard = (data === null || data === void 0 ? void 0 : data.name) || "";
    }
}
exports.default = BusinessServices;
//# sourceMappingURL=BusinessServices.js.map