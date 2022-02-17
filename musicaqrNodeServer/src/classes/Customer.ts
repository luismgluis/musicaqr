import App from "../App";
import utils from "../libs/utils/utils";
import { FireDoc } from "../types/types";
import * as ping from "ping";
import fetch from "node-fetch";
import SeleniumActions, {
	SeleniumExecuteResult,
	SeleniumNativeAction,
} from "../actions/seleniumActions";

type RouterAnalyzeStates =
	| "wait"
	| "started"
	| "finish"
	| "timeout"
	| "error"
	| "unrecognized"
	| "skip";
export type TestRouter = {
	state: RouterAnalyzeStates;
	customer: Customer;
	creator: string;
	updateTestDoc?: (test: TestRouterSimple) => void;
};
export type TestRouterSimple = {
	state: RouterAnalyzeStates;
	idCustomer: string;
	creator: string;
	doc?: FireDoc;
};

export interface CustomerInterface {
	id: string;
	name: string;
	lastName: string;
	ip: string;
	router: string;
	routerUser?: string;
	routerPass?: string;
	appUser?: string;
	appPass?: string;
	idCard: string;
	email: string;
	creationDate: number;
	isNull?: boolean;
	idDoc?: string;
}
export type RouterOnlyCheck = "login" | "connection" | "changeWifi" | null;
export type WifiChangeRequest = {
	id: string;
	idCustomer: string;
	idCard: string;
	wifiUser: string;
	wifiPassword: string;
	complete: Boolean;
	result?: string;
	fireDoc?: FireDoc;
	email: "none" | "sended" | "accepted";
};
export type CustomerWifiChange = {
	customer: CustomerSelenium;
	change: WifiChangeRequest;
};
export default class Customer implements CustomerInterface {
	id: string;
	name: string;
	lastName: string;
	ip: string;
	router: string;
	routerUser?: string;
	routerPass?: string;
	appUser?: string;
	appPass?: string;
	idCard: string;
	email: string;
	creationDate: number;
	isNull?: boolean;
	idDoc?: string;

	constructor(data: CustomerInterface | null, isNull?: boolean) {
		this.name = data?.name || "";
		this.id = data?.id || "";
		this.email = data?.email || "";
		this.lastName = data?.lastName || "";
		this.ip = data?.ip || "";
		this.router = data?.router || "";
		this.idCard = data?.idCard || "";
		this.routerUser = data?.routerUser || "";
		this.routerPass = data?.routerPass || "";
		this.appUser = data?.appUser || "";
		this.appPass = data?.appPass || "";
		this.isNull = isNull || false; // check if Customer has not initialized
		this.creationDate = data?.creationDate || 0;
		this.idDoc = data?.idDoc || "";
	}
	uploadFromOther(otherCustomer: Customer) {
		utils.objects.uploadObjFromObj(this, otherCustomer);
	}
	public get isEmptyTotal(): boolean {
		return this.id === "" || this.id !== this.idDoc;
	}
	public get isEmpty(): boolean {
		return this.id === "";
	}

	exportObject() {
		const newOb = utils.objects.cloneObject(this, true);
		console.log(newOb);
		return newOb;
	}
}
type RouterInfoResult = "error" | "navigate-error" | "ok" | "without-element";
export class CustomerSelenium extends Customer {
	completeWifiChange: boolean;
	private app: App;
	private _fireDoc: FireDoc | null;

	constructor(
		data: CustomerInterface | null,
		app: App,
		fireDoc: FireDoc | null
	) {
		super(data, false);
		this.app = app;
		this._fireDoc = fireDoc;
		this.completeWifiChange = false;
	}
	private get seleniumActions(): SeleniumActions {
		return this.app.seleniumActions;
	}

	public get fireDoc(): FireDoc {
		return this._fireDoc;
	}
	getIpUrl() {
		const that = this;
		let myip = that.ip;
		if (!myip.includes("http")) myip = "http://" + myip;
		return myip;
	}
	setCompleteWifiChange(
		change: WifiChangeRequest,
		yesNo: boolean,
		result: "OK" | "FAIL"
	) {
		const that = this;
		return new Promise<boolean>((resolve, reject) => {
			try {
				if (typeof yesNo !== "boolean") {
					resolve(false);
				}
				if (!change.fireDoc) {
					resolve(false);
				}
				change.fireDoc.ref
					.update({ complete: yesNo, result: result })
					.then(() => {
						resolve(true);
					});
			} catch (error) {
				reject(null);
			}
		});
	}
	async getMyRouterInfo() {
		const that = this;
		try {
			const router = await that.app.api.routers.getRouter(that.router);
			if (router) {
				return router;
			}
			return null;
		} catch (error) {
			console.log(error, "customer on getmyrouterinfo");
			return null;
		}
	}
	hasPing(host: string = "") {
		const that = this;
		if (host === "") host = this.ip;

		return new Promise<boolean>(async (resolve, reject) => {
			try {
				ping.sys.probe(host, async function (isAlive) {
					const hasFetch = await that.hasFetch();
					if (hasFetch) {
						resolve(true);
						return;
					}
					resolve(false);
				});
			} catch (error) {
				console.log(error, "customer hasping");
				reject(error);
			}
		});
	}
	hasFetch(url: string = "") {
		if (url === "") url = this.ip;
		return new Promise<boolean>((resolve, reject) => {
			try {
				if (!url.includes("http")) {
					url = "http://" + url;
				}
				const controller = new AbortController();
				const timeoutId = setTimeout(
					() => controller.abort(),
					1000 * 5
				);

				fetch(url, { signal: controller.signal })
					.then(async (response) => {
						const json = await response.text();
						if (json) {
							resolve(true);
							return;
						}
						resolve(false);
					})
					.catch((err) => {
						console.log(err);
						resolve(false);
					})
					.finally(() => {
						clearTimeout(timeoutId);
					});
			} catch (error) {
				console.log(error);
				resolve(false);
			}
		});
	}
	async changeWifiPassword(
		change: WifiChangeRequest,
		onlyCheck: RouterOnlyCheck = null
	): Promise<SeleniumExecuteResult> {
		const that = this;
		let continueAll = true;
		let result: SeleniumExecuteResult = {
			state: true,
			value: null,
		};

		if (that.router === "") {
			result.state = false;
			result.value = "WITHOUT-ROUTER";
			return result;
		}
		if (onlyCheck === null) {
			await that.getRouterInfo();
		}
		if (onlyCheck === "changeWifi") {
			that.seleniumActions.clean();
		}
		const actions = that.seleniumActions;
		const router = await that.getMyRouterInfo();
		const steps = router.getSteps();

		if (steps.length === 0) {
			result.state = false;
			return result;
		}

		for (const step of steps) {
			if (!continueAll) break;
			let stepValue = "";
			let stepAction: SeleniumNativeAction = "click";
			switch (step.action) {
				case "navigate":
					stepValue = that.getIpUrl() + (step.domElement || "");
					stepAction = "navigate";
					break;
				case "inputUserLogin":
					stepValue = that.routerUser;
					stepAction = "setInputValue";
					break;
				case "inputPasswordLogin":
					stepValue = that.routerPass;
					stepAction = "setInputValue";
					break;
				case "setNewWifiName":
					stepValue = change.wifiUser;
					stepAction = "setInputValue";
					break;
				case "setNewWifiPassword":
					stepValue = change.wifiPassword;
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
				case "stopOnLogin":
					stepValue = "";
					stepAction = "await";
					if (onlyCheck === "login") {
						continueAll = false;
					}
					break;
				case "alert":
					stepValue = step.script;
					stepAction = "alert";
					break;
				case "changeFrame":
					stepValue = step.script;
					stepAction = "changeFrame";
					break;
				default:
					continue;
			}
			//execute action
			let script = "";
			if (step.domElement) {
				script = `return document.querySelector("${step.domElement}")`;
			} else {
				script = step.script || "";
			}
			try {
				result = await actions.execute(stepAction, script, stepValue);
				if (
					step.action === "stopOnLogin" &&
					onlyCheck === "login" &&
					result.state
				) {
					result.state = true;
					return result;
				}
				if (!result.state) {
					continueAll = false;
				}
			} catch (error) {
				console.log(error);
				continueAll = false;
			}
		}
		return result;
	}
	getLoginCredentials() {
		const that = this;
		return new Promise<boolean>(async (resolve, reject) => {
			try {
				let bankLogins = that.app.routersBankLogins;
				const oldData = {
					user: that.routerUser,
					password: that.routerPass,
				};
				let itsOk = false;
				for (const login of bankLogins) {
					that.routerUser = login.user;
					that.routerPass = login.password;
					const res = await that.changeWifiPassword(
						{
							id: "",
							idCustomer: that.id,
							idCard: that.idCard,
							wifiUser: "newUser",
							wifiPassword: "newPassword",
							email: "none",
							complete: false,
						},
						"login"
					);
					if (res.state) {
						itsOk = true;
						break;
					}
				}
				if (itsOk) {
					resolve(true);
					return;
				}
				that.routerUser = oldData.user;
				that.routerPass = oldData.password;
				resolve(false);
			} catch (error) {
				reject(error);
			}
		});
	}
	getRouterInfo(forceAnalysis = false) {
		const that = this;
		const actions = this.app.seleniumActions;
		return new Promise<RouterInfoResult>(async (resolve, reject) => {
			try {
				if (that.isEmpty) {
					resolve("ok");
					return;
				}
				let routers = that.app.deviceRouters;
				let limit = 50;
				let navigateExecuted = false;
				while (routers.length === 0 && limit > 0) {
					await utils.timeOut(200);
					routers = that.app.deviceRouters;
					limit--;
				}
				let myip = that.ip;
				const hasPing = await that.hasFetch();
				console.log(`The IP ${myip} ping has ${hasPing}`);

				if (!hasPing) {
					resolve("navigate-error");
					return;
				}
				if (!myip.includes("http")) myip = "http://" + myip;

				let hasNavigate = false;
				for (const key in routers) {
					const device = routers[key];
					const query = device.analyzeRouterType;
					if (query !== "") {
						if (!navigateExecuted) {
							hasNavigate = (
								await actions.execute("navigate", "", myip)
							).state;
							navigateExecuted = true;
						}

						console.log(
							`The IP ${myip} hasNavigate ${hasNavigate}`
						);

						let hasElement = false;
						if (hasNavigate)
							hasElement = (
								await actions.execute("searchElement", query)
							).state;

						console.log(`The IP ${myip} hasElement ${hasElement}`);

						if (hasElement && hasNavigate) {
							try {
								console.log(hasElement);
								that.router = device.id;
								await that.app.api.customer.modifyCustomer(
									that.app.business,
									that
								);
								const resultCredentials =
									await that.getLoginCredentials(); // !!!

								that.app.seleniumActions.insertGreenScreen(
									`Acciones en ${myip} terminadas`
								);

								console.log(
									`The IP ${myip} resultCredentials ${resultCredentials}`
								);
								if (resultCredentials) {
									await that.app.api.customer.modifyCustomer(
										that.app.business,
										that
									);
								}

								resolve("ok");
								return;
							} catch (error) {
								console.log(error);
							}
						}
					}
				}
				if (hasNavigate) {
					resolve("without-element");
					return;
				}
				resolve("navigate-error");
			} catch (error) {
				reject(null);
			}
		});
	}
}
