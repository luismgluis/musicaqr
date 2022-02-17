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
class WifiChanges {
    constructor(fireDoc, app) {
        this._fireDoc = fireDoc;
        this._app = app;
        this.idDoc = fireDoc.id;
        const data = fireDoc.data();
        this.complete = data.complete;
        this.creationDate = data.creationDate;
        this.idUser = data.idUser;
        this.idRouter = (data === null || data === void 0 ? void 0 : data.idRouter) || "";
        this.routerName = (data === null || data === void 0 ? void 0 : data.routerName) || "";
        this.loginPassword = (data === null || data === void 0 ? void 0 : data.loginPassword) || "";
        this.loginUser = (data === null || data === void 0 ? void 0 : data.loginUser) || "";
        this.wifiName = (data === null || data === void 0 ? void 0 : data.wifiName) || "";
        this.wifiPassword = (data === null || data === void 0 ? void 0 : data.wifiPassword) || "";
        this.url = (data === null || data === void 0 ? void 0 : data.url) || "";
        this._routerInfo = null;
    }
    setComplete(yesNo) {
        const that = this;
        return new Promise((resolve, reject) => {
            try {
                if (typeof yesNo !== "boolean") {
                    resolve(false);
                }
                that._fireDoc.ref
                    .update({ complete: that.complete })
                    .then(() => {
                    resolve(true);
                });
            }
            catch (error) {
                reject(null);
            }
        });
    }
    getRouterSteps() {
        const steps = this._routerInfo.getSteps();
        if (steps)
            return steps;
        return [];
    }
    getRouterInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._routerInfo !== null) {
                    return this._routerInfo;
                }
                const s = yield this._app.api
                    .getRouterInfo(this.idRouter)
                    .then((d) => {
                    return d;
                })
                    .catch((err) => {
                    return null;
                });
                console.log(s);
                this._routerInfo = s;
                return s;
            }
            catch (error) {
                return null;
            }
        });
    }
    changeWifiPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getRouterInfo();
            const actions = this._app.seleniumActions;
            const steps = this.getRouterSteps();
            if (steps.length === 0) {
                return false;
            }
            for (const key in steps) {
                const step = steps[key];
                let stepValue = "";
                let stepAction = "click";
                switch (step.action) {
                    case "navigate":
                        stepValue = this.url;
                        stepAction = "navigate";
                        break;
                    case "inputUserLogin":
                        stepValue = this.loginUser;
                        stepAction = "setInputValue";
                        break;
                    case "inputPasswordLogin":
                        stepValue = this.loginPassword;
                        stepAction = "setInputValue";
                        break;
                    case "setNewWifiName":
                        stepValue = this.wifiName;
                        stepAction = "setInputValue";
                        break;
                    case "setNewWifiPassword":
                        stepValue = this.wifiPassword;
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
                    default:
                        continue;
                        break;
                }
                //execute action
                let script = "";
                if (step.domElement) {
                    script = `return document.querySelector("${step.domElement}")`;
                }
                else {
                    script = step.script;
                }
                const result = yield actions.execute(stepAction, script, stepValue);
            }
            return true;
        });
    }
}
exports.default = WifiChanges;
//# sourceMappingURL=WifiChanges.js.map