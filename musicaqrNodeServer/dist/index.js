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
const App_1 = require("./App");
const express = require("express");
const Customer_1 = require("./classes/Customer");
const TAG = "index";
let mysoftWifiSerial = "spacoma123";
if (typeof process.env.mysoftWifiSerial !== "undefined") {
    // mysoftWifiSerial = process.env.mysoftWifiSerial; //WORKKKK
}
const myApp = new App_1.default(mysoftWifiSerial); //serial
const onStart = () => {
    const port = 3001;
    const app = express();
    // http://127.0.0.1:3000/?wifi=3312&password=200816
    const wifiChangesListener = myApp.api.onWifiChangesRequest((data) => __awaiter(void 0, void 0, void 0, function* () {
        for (const key in data) {
            const change = data[key];
            if (!change.customer.completeWifiChange) {
                const result = yield change.customer.changeWifiPassword(change.change, "changeWifi");
                change.customer.setCompleteWifiChange(change.change, true, result.state ? "OK" : "FAIL");
                yield myApp.reOpenBrowser();
                // console.log(result);
            }
        }
    }));
    const routersAnalyzeListener = myApp.api.onRoutersAnalyzeRequest((data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            for (const change of data) {
                const customerSelenium = new Customer_1.CustomerSelenium(change.customer, myApp, null);
                const itsOk = yield customerSelenium.getRouterInfo(true);
                const result = {
                    state: "finish",
                    idCustomer: change.customer.id,
                    creator: change.creator,
                };
                if (itsOk === "ok") {
                    result.state = "finish";
                    if (change.updateTestDoc)
                        change.updateTestDoc(result);
                }
                if (itsOk !== "without-element") {
                    //error or error navigate
                    result.state = "error";
                }
                if (itsOk === "without-element") {
                    result.state = "unrecognized";
                }
                if (change.updateTestDoc)
                    change.updateTestDoc(result);
            }
        }
        catch (error) {
            console.log(error, " - on routersAnalyzeListener");
        }
    }));
    let listeners = {
        closeWifi: wifiChangesListener,
        routersAnalyze: routersAnalyzeListener,
    };
    app.get("/", (req, res) => {
        try {
            const p = req.query;
            if (typeof p.wifi !== "undefined") {
                if (typeof p.password !== "undefined") {
                    const wifi = p.wifi;
                    const password = p.password;
                    console.log(TAG, p);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        res.send("Well done!");
    });
    app.get("/close", (req, res) => {
        try {
            Object.keys(listeners).forEach((item) => {
                if (typeof listeners[item] === "function") {
                    listeners[item]();
                }
            });
            res.send("listeners closed");
        }
        catch (error) { }
    });
    app.listen(port, () => {
        console.log(`The application is listening on port ${port} !`);
    });
};
myApp
    .start()
    .then((res) => {
    onStart();
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map