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
const admin = require("firebase-admin");
const seleniumActions_1 = require("./actions/seleniumActions");
const database_1 = require("./database/database");
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = require("selenium-webdriver/chrome");
const serviceAccount = require("../config/firebaseconfig.json");
const getNewDriver = () => {
    const caps = new selenium_webdriver_1.Capabilities();
    caps.setPageLoadStrategy("eager");
    caps.setAcceptInsecureCerts(true);
    const builder = new selenium_webdriver_1.Builder().withCapabilities(caps).forBrowser("chrome");
    try {
        let options = builder.getChromeOptions();
        if (options === null) {
            const options2 = new chrome_1.Options();
            options2.addArguments("ignore-certificate-errors");
            options2.setAcceptInsecureCerts(true);
            options = options2;
        }
        builder.setChromeOptions(options);
    }
    catch (error) {
        console.log(error);
    }
    const driver = builder.build();
    return driver;
};
const driver = getNewDriver();
class App {
    constructor(serialToken) {
        this.started = false;
        this._database = null;
        this._selenium = null;
        //----------------------
        this.serial = serialToken;
        // ---------------------
        this.browserDriver = driver;
    }
    validateSerial() {
        const that = this;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const business = yield that.api.business.getBusinessBySerial(that.serial);
                if (business) {
                    that.business = business;
                    resolve(true);
                    return;
                }
                reject(null);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    initializeListeners() {
        const that = this;
        // const routersListener = this.api.routers.getRoutersListener((res) => {
        // 	that.deviceRouters = res;
        // });
        return () => {
            // routersListener(); //close
        };
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            if (that.started)
                return true;
            try {
                // admin.initializeApp();
                that.fireApp = admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                }, "musicaqr");
                that._database = new database_1.default(that);
                that._selenium = new seleniumActions_1.default(that);
                //--post initialize
                that.started = true;
                const validate = yield that.validateSerial();
                if (validate) {
                    that.initializeListeners();
                    return;
                }
                that.started = false;
            }
            catch (error) {
                that.started = false;
                throw new Error(error);
            }
        });
    }
    reOpenBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._selenium = new seleniumActions_1.default(this);
            }
            catch (error) {
                console.log(error);
            }
            try {
                yield this.browserDriver.quit();
                yield this.browserDriver.close();
            }
            catch (error) {
                console.log(error);
            }
            try {
                const newDriver = getNewDriver();
                this.browserDriver = newDriver;
                yield newDriver.manage().deleteAllCookies();
                this.seleniumActions.insertGreenScreen("Hola, No cierres esta ventana att MysoftSolutions");
            }
            catch (error) {
                console.log(error);
            }
            return true;
        });
    }
    get api() {
        if (!this.started)
            this.start();
        return this._database;
    }
    get seleniumActions() {
        if (!this.started)
            this.start();
        return this._selenium;
    }
    get firestore() {
        if (!this.started)
            this.start();
        return this.fireApp.firestore();
    }
    database() {
        if (!this.started)
            this.start();
        return this.fireApp.firestore();
    }
    get storage() {
        if (!this.started)
            this.start();
        return this.fireApp.storage();
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map