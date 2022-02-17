import App from "./App";
import * as express from "express";
import { CustomerSelenium, TestRouterSimple } from "./classes/Customer";

const TAG = "index";
let mysoftWifiSerial = "spacoma123";
if (typeof process.env.mysoftWifiSerial !== "undefined") {
	// mysoftWifiSerial = process.env.mysoftWifiSerial; //WORKKKK
}

const myApp = new App(mysoftWifiSerial); //serial

const onStart = () => {
	const port = 3001;

	const app = express();
	// http://127.0.0.1:3000/?wifi=3312&password=200816

	const wifiChangesListener = myApp.api.onWifiChangesRequest(async (data) => {
		for (const key in data) {
			const change = data[key];
			if (!change.customer.completeWifiChange) {
				const result = await change.customer.changeWifiPassword(
					change.change,
					"changeWifi"
				);
				change.customer.setCompleteWifiChange(
					change.change,
					true,
					result.state ? "OK" : "FAIL"
				);

				await myApp.reOpenBrowser();
				// console.log(result);
			}
		}
	});

	const routersAnalyzeListener = myApp.api.onRoutersAnalyzeRequest(
		async (data) => {
			try {
				for (const change of data) {
					const customerSelenium = new CustomerSelenium(
						change.customer,
						myApp,
						null
					);

					const itsOk = await customerSelenium.getRouterInfo(true);
					const result: TestRouterSimple = {
						state: "finish",
						idCustomer: change.customer.id,
						creator: change.creator,
					};
					if (itsOk === "ok") {
						result.state = "finish";
						if (change.updateTestDoc) change.updateTestDoc(result);
					}
					if (itsOk !== "without-element") {
						//error or error navigate
						result.state = "error";
					}
					if (itsOk === "without-element") {
						result.state = "unrecognized";
					}
					if (change.updateTestDoc) change.updateTestDoc(result);
				}
			} catch (error) {
				console.log(error, " - on routersAnalyzeListener");
			}
		}
	);

	let listeners = {
		closeWifi: wifiChangesListener,
		routersAnalyze: routersAnalyzeListener,
	};

	app.get("/", (req, res) => {
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
		} catch (error) {}
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
