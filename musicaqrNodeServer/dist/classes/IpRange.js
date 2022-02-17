"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../libs/utils/utils");
class IpRange {
    constructor(data, isNull) {
        this.ip = (data === null || data === void 0 ? void 0 : data.ip) || "";
        this.id = (data === null || data === void 0 ? void 0 : data.id) || "";
        this.range = (data === null || data === void 0 ? void 0 : data.range) || 0;
        this.isNull = isNull || false; // check if IpRange has not initialized
        this.creationDate = (data === null || data === void 0 ? void 0 : data.creationDate) || 0;
    }
    setIp(ip) {
        if (ip.includes("/")) {
            const newip = ip.split("/")[0];
            if (utils_1.default.validateIp(newip)) {
                try {
                    const arrip = newip.split(".");
                    this.ip = `${arrip[0]}.${arrip[1]}.${arrip[2]}.0`;
                    this.range = Number(ip.split("/")[1]);
                    return true;
                }
                catch (error) { }
            }
            return false;
        }
        if (utils_1.default.validateIp(ip)) {
            this.ip = ip;
            this.range = 24;
            return true;
        }
        return false;
    }
    getIpsInRange() {
        if (!utils_1.default.validateIp(this.ip)) {
            return [];
        }
        const arrip = this.ip.split(".");
        const ipLeft = `${arrip[0]}.${arrip[1]}.${arrip[2]}`;
        const arrResult = [];
        for (let index = 0; index < 255; index++) {
            arrResult.push(`${ipLeft}.${index}`);
        }
        return arrResult;
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
exports.default = IpRange;
//# sourceMappingURL=IpRange.js.map