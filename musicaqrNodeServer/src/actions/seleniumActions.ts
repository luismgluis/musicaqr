import { By, until, WebElement } from "selenium-webdriver";
import App from "../App";
import utils from "../libs/utils/utils";
export type SeleniumNativeAction =
	| "setInputValue"
	| "getInputValue"
	| "click"
	| "await"
	| "navigate"
	| "awaitRemove"
	| "searchElement"
	| "changeFrame"
	| "alert"
	| "stopOnLogin";

type SeleniumAction =
	| "navigate"
	| "await"
	| "inputUserLogin"
	| "inputPasswordLogin"
	| "click"
	| "getCurrentWifiPassword"
	| "setNewWifiName"
	| "stopOnLogin"
	| "setNewWifiPassword"
	| "changeFrame"
	| "alert";
export type SeleniumExecuteResult = {
	state: boolean;
	value: any;
};
export type SeleniumStep = {
	domElement?: string;
	script?: string;
	action: SeleniumAction;
};
const TAG = "SELENIUM ACTIONS";
class SeleniumActions {
	private app: App;
	private lastUrlNavigated: string;
	private idGreenScreen: string;
	private messageGreenScreen: string;
	constructor(app: App) {
		this.app = app;
		this.lastUrlNavigated = "";
		this.idGreenScreen = "mysoftSolutionsGreenScreen";
		this.messageGreenScreen = "";
	}
	clean() {
		this.lastUrlNavigated = "";
	}
	private async querySelector(domElement: string) {
		const driver = this.app.browserDriver;
		const exe: WebElement = await By.js(domElement)(driver)
			.then((data) => data)
			.catch((err) => {
				console.log(err, "on selenium actions querySelector");
				return err;
			});
		return exe;
	}
	private async navigate(url: string) {
		const that = this;
		try {
			if (url === that.lastUrlNavigated) return true;

			const driver = that.app.browserDriver;

			await driver.switchTo().newWindow("tab");
			const tabs = await driver.getAllWindowHandles();

			if (tabs.length > 1) {
				console.log(tabs);
				await driver.switchTo().window(tabs[0]);
				await driver.close();
				await driver.switchTo().window(tabs[1]);
			}
			const res = await driver
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
				await that.insertGreenScreen("Estamos trabajando en " + url);
			}
			return res;
		} catch (error) {
			console.log(error, "on selenium actions navigate");
		}
		return false;
	}
	public async insertGreenScreen(msj = "") {
		const that = this;
		if (msj !== "") that.messageGreenScreen = msj;

		try {
			const driver = that.app.browserDriver;
			const screen = await that.querySelector(
				`return document.querySelector("#${that.idGreenScreen}");`
			);
			if (screen) {
				await driver.executeScript(
					`document.querySelector("#${that.idGreenScreen}").remove();`
				);
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
			await driver.executeScript(timerScript);
		} catch (error) {
			console.log(error);
		}
		return true;
	}

	public async reInsertGreenScreen() {
		const that = this;

		const screen = await that.querySelector(
			`return document.querySelector("#${that.idGreenScreen}")`
		);
		if (!screen) {
			that.insertGreenScreen();
		}
	}
	private async awaitLoading(domElement: string) {
		try {
			const driver = this.app.browserDriver;
			if (domElement !== "" && typeof domElement !== "undefined") {
				const result = async () => {
					const res = await driver.wait(async () => {
						const element = await this.querySelector(domElement);
						if (element) {
							return true;
						}
						return false;
					}, 300);
					return res;
				};

				return await result();
			} else {
				await driver.sleep(200);
			}
		} catch (error) {
			console.log(error, "selenium actions on awaitLoading");

			return false;
		}
		return true;
	}
	private async awaitRemove(domElement: string) {
		try {
			const driver = this.app.browserDriver;
			if (domElement) {
				await driver.wait(async () => {
					const element = await this.querySelector(domElement);
					if (element) {
						return false;
					}
					return true;
				}, 300);
				console.log("ready");
			} else {
				await driver.sleep(200);
			}
		} catch (error) {
			console.log(error, "selenium actions on awaitRemove");
		}
		return true;
	}
	private async click(domElement: string) {
		const clickJs = async () => {
			try {
				const element = await this.querySelector(domElement);
				const driver = this.app.browserDriver;
				// 				JavascriptExecutor js = (JavascriptExecutor)driver;
				// js.executeScript("arguments[0].click();", element);

				const result = await driver.executeScript(
					`return (()=>{${domElement}})().click();`,
					element
				);
				if (result) {
					console.log(result);
					return true;
				}
				console.log(result);
				return true;
			} catch (error) {
				console.log(error, "selenium actions on clickjs");
				return false;
			}
		};

		try {
			const element = await this.querySelector(domElement);
			await element.click();
			return true;
		} catch (error) {
			if (typeof error.message !== "undefined") {
				if (error.message.includes("click is not a function")) {
					error.name = "ElementClickInterceptedError";
				}
			}
			if (typeof error.name !== "undefined") {
				if (error.name === "ElementClickInterceptedError") {
					return await clickJs();
				}
			}
			return false;
		}
	}

	private async setInputValue(domElement: string, value: string) {
		const driver = this.app.browserDriver;
		try {
			const element = await this.querySelector(domElement);
			// driver.findElement(element)
			await element.clear();
			const result = await element
				.sendKeys(value)
				.then(async () => {
					await driver.sleep(200);
					return true;
				})
				.catch((err) => {
					console.log(err);
					return false;
				});

			return result;
		} catch (error) {
			console.log(error, "selenium actions on setinputvalue");
		}
	}
	private async getInputValue(domElement: string) {
		const element = await this.querySelector(domElement);
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
	}
	private async handlePromptAlert(action: "accept" | "getText" | "dismiss") {
		const driver = this.app.browserDriver;
		if (action === "accept") {
			try {
				driver.wait(until.alertIsPresent()).then((alert) => {
					alert.accept();
				});
				return true;
			} catch (error) {
				console.log(error);
			}
		}
		if (action === "dismiss") {
			try {
				driver.wait(until.alertIsPresent()).then((alert) => {
					alert.dismiss();
				});
				return true;
			} catch (error) {
				console.log(error);
			}
		}
		return false;
	}
	private async changeFrame(frameElement: string) {
		try {
			const driver = this.app.browserDriver;
			const frame = await this.querySelector(frameElement);
			await driver
				.switchTo()
				.frame(frameElement === "null" ? null : frame);
			return true;
		} catch (error) {
			console.log(error, "selenium actions on awaitRemove");
		}
	}

	async execute(
		action: SeleniumNativeAction,
		scriptSearchElement: string,
		value: string = ""
	) {
		let result: SeleniumExecuteResult = { state: false, value: null };
		try {
			const driver = this.app.browserDriver;
			switch (action) {
				case "navigate":
					result.state = await this.navigate(value);
					break;
				case "click":
					result.state = await this.click(scriptSearchElement);
					break;
				case "await":
					result.state = await this.awaitLoading(scriptSearchElement);
					break;
				case "setInputValue":
					result.state = await this.setInputValue(
						scriptSearchElement,
						value
					);
					break;
				case "getInputValue":
					result.state = await this.getInputValue(
						scriptSearchElement
					);
					break;
				case "awaitRemove":
					result.state = await this.awaitRemove(scriptSearchElement);
					break;
				case "searchElement":
					const el = await this.querySelector(scriptSearchElement);
					if (el) {
						result.state = true;
						result.value = el;
					}
					break;
				case "changeFrame":
					result.state = await this.changeFrame(scriptSearchElement);
					break;
				case "alert":
					await utils.timeOut(400);
					result.state = await this.handlePromptAlert(
						<any>scriptSearchElement
					);
					break;
				default:
					break;
			}
			await utils.timeOut(500);
			this.reInsertGreenScreen();
		} catch (error) {
			console.log(error, "selenium actions on execute");
		}

		return result;
	}
}
export default SeleniumActions;
