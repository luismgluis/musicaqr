import * as admin from "firebase-admin";
import SeleniumActions from "./actions/seleniumActions";
import FireDatabase from "./database/database";
import { Builder, Capabilities } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import Business from "./classes/Business";

const serviceAccount = require("../config/firebaseconfig.json");

export interface AppType {
	started: boolean;
	// fireApp:  admin.app.App;
}

const caps = new Capabilities();
caps.setPageLoadStrategy("eager");
caps.setAcceptInsecureCerts(true);

const builder = new Builder().withCapabilities(caps).forBrowser("chrome");
// builder.withCapabilities(chromeDesktop);
try {
	let options = builder.getChromeOptions();
	if (options === null) {
		const options2 = new Options();
		options2.addArguments("ignore-certificate-errors");
		options2.setAcceptInsecureCerts(true);
		// options2.addArguments("--blink-settings=imagesEnabled=false");

		options = options2;
	}
	builder.setChromeOptions(options);
} catch (error) {
	console.log(error);
}

const driver = builder.build();

const TAG = "APP.js";

class App implements AppType {
	started: boolean;
	private fireApp: admin.app.App;
	private _selenium: SeleniumActions | null;
	private _database: FireDatabase | null;
	browserDriver: typeof driver;
	serial: string;
	business: Business;

	constructor(serialToken: string) {
		this.started = false;
		this._database = null;
		this._selenium = null;
		//----------------------
		this.serial = serialToken;

		// ---------------------
		this.browserDriver = driver;
	}
	private validateSerial() {
		const that = this;
		return new Promise<boolean>(async (resolve, reject) => {
			try {
				const business = await that.api.business.getBusinessBySerial(
					that.serial
				);
				if (business) {
					that.business = business;
					resolve(true);
					return;
				}
				reject(null);
			} catch (error) {
				reject(error);
			}
		});
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
	async start() {
		const that = this;
		if (that.started) return true;

		try {
			// admin.initializeApp();
			that.fireApp = admin.initializeApp(
				{
					credential: admin.credential.cert(<any>serviceAccount),
				},
				"musicaqr"
			);
			that._database = new FireDatabase(that);
			that._selenium = new SeleniumActions(that);

			//--post initialize
			that.started = true;
			const validate = await that.validateSerial();

			if (validate) {
				that.initializeListeners();

				return;
			}
			that.started = false;
		} catch (error) {
			that.started = false;
			throw new Error(error);
		}
	}
	async reOpenBrowser() {
		try {
			this._selenium = new SeleniumActions(this);
		} catch (error) {
			console.log(error);
		}
		try {
			await this.browserDriver.quit();
			await this.browserDriver.close();
		} catch (error) {
			console.log(error);
		}
		try {
			const newDriver = builder.build();
			this.browserDriver = newDriver;

			await newDriver.manage().deleteAllCookies();
			this.seleniumActions.insertGreenScreen(
				"Hola, No cierres esta ventana att MysoftSolutions"
			);
		} catch (error) {
			console.log(error);
		}
		return true;
	}
	public get api(): FireDatabase {
		if (!this.started) this.start();
		return this._database!;
	}
	public get seleniumActions(): SeleniumActions {
		if (!this.started) this.start();
		return this._selenium!;
	}

	public get firestore() {
		if (!this.started) this.start();
		return this.fireApp.firestore();
	}

	public database() {
		if (!this.started) this.start();
		return this.fireApp.firestore();
	}
	public get storage() {
		if (!this.started) this.start();
		return this.fireApp.storage();
	}
}

export default App;
