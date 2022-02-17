import App from "./App";
import * as express from "express";

const TAG = "index";
let mysoftWifiSerial = "spacoma123";
if (typeof process.env.mysoftWifiSerial !== "undefined") {
	// mysoftWifiSerial = process.env.mysoftWifiSerial; //WORKKKK
}

const myApp = new App(mysoftWifiSerial); //serial

const onStart = () => {
	const port = 3001;

	const app = express();
	// const wifiChangesListener = myApp.api.onWifiChangesRequest(async (data) => {
	// 	for (const key in data) {
	// 		const change = data[key];

	// 	}
	// });

	let listeners = {
		// closeWifi: wifiChangesListener,
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
