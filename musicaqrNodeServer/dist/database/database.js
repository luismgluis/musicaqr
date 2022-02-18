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
const FireDatabaseBusiness_1 = require("./business/FireDatabaseBusiness");
class FireDatabase {
    constructor(app) {
        this.app = app;
        this.business = new FireDatabaseBusiness_1.default(app);
    }
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
}
exports.default = FireDatabase;
//# sourceMappingURL=database.js.map