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
const selenium_webdriver_1 = require("selenium-webdriver");
const utils_1 = require("../libs/utils/utils");
const TAG = "SELENIUM ACTIONS";
class SeleniumActions {
    constructor(app) {
        this.app = app;
        this.lastUrlNavigated = "";
        this.idGreenScreen = "mysoftSolutionsGreenScreen";
        this.messageGreenScreen = "";
    }
    clean() {
        this.lastUrlNavigated = "";
    }
    querySelector(domElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = this.app.browserDriver;
            const exe = yield selenium_webdriver_1.By.js(domElement)(driver)
                .then((data) => data)
                .catch((err) => {
                console.log(err, "on selenium actions querySelector");
                return err;
            });
            return exe;
        });
    }
    navigate(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            try {
                if (url === that.lastUrlNavigated)
                    return true;
                const driver = that.app.browserDriver;
                yield driver.switchTo().newWindow("tab");
                const tabs = yield driver.getAllWindowHandles();
                if (tabs.length > 1) {
                    console.log(tabs);
                    yield driver.switchTo().window(tabs[0]);
                    yield driver.close();
                    yield driver.switchTo().window(tabs[1]);
                }
                const res = yield driver
                    .get(url)
                    .then(() => {
                    console.log(TAG, "driver get");
                    return true;
                })
                    .catch((err) => {
                    return false;
                })
                    .finally(() => {
                    that.lastUrlNavigated = url;
                });
                if (res) {
                    yield that.insertGreenScreen("Estamos trabajando en " + url);
                }
                return res;
            }
            catch (error) {
                console.log(error, "on selenium actions navigate");
            }
            return false;
        });
    }
    insertGreenScreen(msj = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            if (msj !== "")
                that.messageGreenScreen = msj;
            try {
                const driver = that.app.browserDriver;
                const screen = yield that.querySelector(`return document.querySelector("#${that.idGreenScreen}");`);
                if (screen) {
                    yield driver.executeScript(`document.querySelector("#${that.idGreenScreen}").remove();`);
                }
                const myFunction = (msj = "") => {
                    const body = document.body;
                    const screen = document.createElement("div");
                    screen.id = that.idGreenScreen;
                    const styles = screen.style;
                    styles.fontFamily = "sans-serif";
                    styles.padding = "10%";
                    styles.position = "absolute";
                    styles.zIndex = "99999";
                    styles.top = "0";
                    styles.width = "100vw";
                    styles.height = "100vh";
                    styles.backgroundColor = "#0c315abf";
                    // styles.backgroundColor = "#0c315a";
                    styles.boxSizing = "border-box";
                    styles.display = "flex";
                    styles.flexDirection = "column";
                    styles.alignItems = "center";
                    const divHeader = document.createElement("div");
                    const title = document.createElement("h5");
                    divHeader.appendChild(title);
                    divHeader.style.paddingTop = "20vh";
                    title.innerText = msj;
                    title.style.color = "white";
                    title.style.fontSize = "20px";
                    const divFooter = document.createElement("div");
                    const footerText = document.createElement("h5");
                    divFooter.appendChild(footerText);
                    divFooter.style.position = "absolute";
                    divFooter.style.bottom = "0";
                    divFooter.style.width = "100%";
                    footerText.innerText = "Created by MySoft Solutions";
                    footerText.style.color = "white";
                    footerText.style.fontSize = "20px";
                    screen.append(divHeader, divFooter);
                    body.appendChild(screen);
                };
                const f = myFunction
                    .toString()
                    .replace(`msj = ""`, `msj = "${that.messageGreenScreen}"`)
                    .replace("that.idGreenScreen", `"${that.idGreenScreen}"`);
                const fn = new Function("return " + f)();
                // await driver.executeScript(fn);
                const timerScript = `
			if (typeof window.timerGreenScreen !== "undefined") {
				if (window.timerGreenScreen) clearInterval(window.timerGreenScreen);
			}
			var timerGreenScreen = () => {
					if(!document.querySelector("#${that.idGreenScreen}")){
						(${fn.toString()})()
					}
			}
			window.timerGreenScreen = setInterval(()=>{timerGreenScreen()},100)
			`;
                yield driver.executeScript(timerScript);
            }
            catch (error) {
                console.log(error);
            }
            return true;
        });
    }
    reInsertGreenScreen() {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            const screen = yield that.querySelector(`return document.querySelector("#${that.idGreenScreen}")`);
            if (!screen) {
                that.insertGreenScreen();
            }
        });
    }
    awaitLoading(domElement) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driver = this.app.browserDriver;
                if (domElement !== "" && typeof domElement !== "undefined") {
                    const result = () => __awaiter(this, void 0, void 0, function* () {
                        const res = yield driver.wait(() => __awaiter(this, void 0, void 0, function* () {
                            const element = yield this.querySelector(domElement);
                            if (element) {
                                return true;
                            }
                            return false;
                        }), 300);
                        return res;
                    });
                    return yield result();
                }
                else {
                    yield driver.sleep(200);
                }
            }
            catch (error) {
                console.log(error, "selenium actions on awaitLoading");
                return false;
            }
            return true;
        });
    }
    awaitRemove(domElement) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driver = this.app.browserDriver;
                if (domElement) {
                    yield driver.wait(() => __awaiter(this, void 0, void 0, function* () {
                        const element = yield this.querySelector(domElement);
                        if (element) {
                            return false;
                        }
                        return true;
                    }), 300);
                    console.log("ready");
                }
                else {
                    yield driver.sleep(200);
                }
            }
            catch (error) {
                console.log(error, "selenium actions on awaitRemove");
            }
            return true;
        });
    }
    click(domElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const clickJs = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const element = yield this.querySelector(domElement);
                    const driver = this.app.browserDriver;
                    // 				JavascriptExecutor js = (JavascriptExecutor)driver;
                    // js.executeScript("arguments[0].click();", element);
                    const result = yield driver.executeScript(`return (()=>{${domElement}})().click();`, element);
                    if (result) {
                        console.log(result);
                        return true;
                    }
                    console.log(result);
                    return true;
                }
                catch (error) {
                    console.log(error, "selenium actions on clickjs");
                    return false;
                }
            });
            try {
                const element = yield this.querySelector(domElement);
                yield element.click();
                return true;
            }
            catch (error) {
                if (typeof error.message !== "undefined") {
                    if (error.message.includes("click is not a function")) {
                        error.name = "ElementClickInterceptedError";
                    }
                }
                if (typeof error.name !== "undefined") {
                    if (error.name === "ElementClickInterceptedError") {
                        return yield clickJs();
                    }
                }
                return false;
            }
        });
    }
    setInputValue(domElement, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = this.app.browserDriver;
            try {
                const element = yield this.querySelector(domElement);
                // driver.findElement(element)
                yield element.clear();
                const result = yield element
                    .sendKeys(value)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    yield driver.sleep(200);
                    return true;
                }))
                    .catch((err) => {
                    console.log(err);
                    return false;
                });
                return result;
            }
            catch (error) {
                console.log(error, "selenium actions on setinputvalue");
            }
        });
    }
    getInputValue(domElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.querySelector(domElement);
            //driver.findElement(element)
            const result = element
                .getText() //"admin\n")
                .then((data) => {
                return true;
            })
                .catch((err) => {
                console.log(err, "selenium actions on getInputValue");
                return null;
            });
            return result;
        });
    }
    handlePromptAlert(action) {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = this.app.browserDriver;
            if (action === "accept") {
                try {
                    driver.wait(selenium_webdriver_1.until.alertIsPresent()).then((alert) => {
                        alert.accept();
                    });
                    return true;
                }
                catch (error) {
                    console.log(error);
                }
            }
            if (action === "dismiss") {
                try {
                    driver.wait(selenium_webdriver_1.until.alertIsPresent()).then((alert) => {
                        alert.dismiss();
                    });
                    return true;
                }
                catch (error) {
                    console.log(error);
                }
            }
            return false;
        });
    }
    changeFrame(frameElement) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driver = this.app.browserDriver;
                const frame = yield this.querySelector(frameElement);
                yield driver
                    .switchTo()
                    .frame(frameElement === "null" ? null : frame);
                return true;
            }
            catch (error) {
                console.log(error, "selenium actions on awaitRemove");
            }
        });
    }
    execute(action, scriptSearchElement, value = "") {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { state: false, value: null };
            try {
                const driver = this.app.browserDriver;
                switch (action) {
                    case "navigate":
                        result.state = yield this.navigate(value);
                        break;
                    case "click":
                        result.state = yield this.click(scriptSearchElement);
                        break;
                    case "await":
                        result.state = yield this.awaitLoading(scriptSearchElement);
                        break;
                    case "setInputValue":
                        result.state = yield this.setInputValue(scriptSearchElement, value);
                        break;
                    case "getInputValue":
                        result.state = yield this.getInputValue(scriptSearchElement);
                        break;
                    case "awaitRemove":
                        result.state = yield this.awaitRemove(scriptSearchElement);
                        break;
                    case "searchElement":
                        const el = yield this.querySelector(scriptSearchElement);
                        if (el) {
                            result.state = true;
                            result.value = el;
                        }
                        break;
                    case "changeFrame":
                        result.state = yield this.changeFrame(scriptSearchElement);
                        break;
                    case "alert":
                        yield utils_1.default.timeOut(400);
                        result.state = yield this.handlePromptAlert(scriptSearchElement);
                        break;
                    default:
                        break;
                }
                yield utils_1.default.timeOut(500);
                this.reInsertGreenScreen();
            }
            catch (error) {
                console.log(error, "selenium actions on execute");
            }
            return result;
        });
    }
}
exports.default = SeleniumActions;
//# sourceMappingURL=seleniumActions.js.map