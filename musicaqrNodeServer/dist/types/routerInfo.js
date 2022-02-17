"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouterInfo {
    constructor(doc) {
        this.doc = doc;
        const data = doc.data();
        this.image = (data === null || data === void 0 ? void 0 : data.image) || "";
        this.name = (data === null || data === void 0 ? void 0 : data.name) || "";
        this.reference = (data === null || data === void 0 ? void 0 : data.reference) || "";
        this.wifiChangeStepsJson = (data === null || data === void 0 ? void 0 : data.wifiChangeStepsJson) || "";
    }
    getSteps() {
        try {
            // const tenda = tenda2;
            // const tendajson = JSON.parse(tenda);
            // console.log(tendajson);
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
}
exports.default = RouterInfo;
//# sourceMappingURL=routerInfo.js.map