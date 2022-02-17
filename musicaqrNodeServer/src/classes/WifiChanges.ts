import SeleniumActions, {
	SeleniumNativeAction,
} from "../actions/seleniumActions";
import App from "../App";
import RouterInfo from "../types/routerInfo";
import { FireDoc } from "../types/types";

class WifiChanges {
	private _fireDoc: FireDoc;
	private _app: App;
	private _routerInfo: RouterInfo;
	idDoc: string;
	complete: boolean;
	creationDate: number;
	idUser: string;
	idRouter: string;
	routerName: string;
	loginPassword: string;
	loginUser: string;
	wifiName: string;
	wifiPassword: string;
	url: string;
	constructor(fireDoc: FireDoc, app: App) {
		this._fireDoc = fireDoc;
		this._app = app;
		this.idDoc = fireDoc.id;
		const data = fireDoc.data();
		this.complete = data.complete;
		this.creationDate = data.creationDate;
		this.idUser = data.idUser;
		this.idRouter = data?.idRouter || "";
		this.routerName = data?.routerName || "";

		this.loginPassword = data?.loginPassword || "";
		this.loginUser = data?.loginUser || "";
		this.wifiName = data?.wifiName || "";
		this.wifiPassword = data?.wifiPassword || "";
		this.url = data?.url || "";
		this._routerInfo = null;
	}
	setComplete(yesNo: boolean) {
		const that = this;
		return new Promise<boolean>((resolve, reject) => {
			try {
				if (typeof yesNo !== "boolean") {
					resolve(false);
				}
				that._fireDoc.ref
					.update({ complete: that.complete })
					.then(() => {
						resolve(true);
					});
			} catch (error) {
				reject(null);
			}
		});
	}
	private getRouterSteps() {
		const steps = this._routerInfo.getSteps();
		if (steps) return steps;
		return [];
	}
	async getRouterInfo() {
		try {
			if (this._routerInfo !== null) {
				return this._routerInfo;
			}
			const s = await this._app.api
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
		} catch (error) {
			return null;
		}
	}
	async changeWifiPassword(): Promise<boolean> {
		await this.getRouterInfo();
		const actions = this._app.seleniumActions;
		const steps = this.getRouterSteps();
		if (steps.length === 0) {
			return false;
		}

		for (const key in steps) {
			const step = steps[key];
			let stepValue = "";
			let stepAction: SeleniumNativeAction = "click";
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
			} else {
				script = step.script;
			}
			const result = await actions.execute(stepAction, script, stepValue);
		}
		return true;
	}
}
export default WifiChanges;
