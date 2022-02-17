import App from "../App";
import {
	CustomerSelenium,
	CustomerWifiChange,
	TestRouter,
	WifiChangeRequest,
} from "../classes/Customer";
import { TestRouterSimple } from "../classes/Customer";
import RouterInfo from "../types/routerInfo";
import FireDatabaseBusiness from "./business/FireDatabaseBusiness";
import FireDatabaseCustomer from "./customer/FireDatabaseCustomer";
import FireDatabaseRouters from "./routers/FireDatabaseRouters";
import { FireDoc } from "../types/types";

class FireDatabase {
	app: App;
	customer: FireDatabaseCustomer;
	business: FireDatabaseBusiness;
	routers: FireDatabaseRouters;
	constructor(app: App) {
		this.app = app;
		this.customer = new FireDatabaseCustomer(app);
		this.business = new FireDatabaseBusiness(app);
		this.routers = new FireDatabaseRouters(app);
	}

	// async getIdBusinessBySerial(serial: string): Promise<string | null> {
	//   const that = this;
	//   const app = that.app;
	//   const data = await app.firestore
	//     .collection("serials")
	//     .doc(serial)
	//     .get()
	//     .then((snap) => {
	//       if (snap.exists) return snap.data();
	//       return null;
	//     })
	//     .catch((err) => {
	//       return null;
	//     });
	//   if (data !== null) {
	//     if (typeof data.idBusiness !== "undefined") {
	//       return data.idBusiness;
	//     }
	//   }
	//   return null;
	// }

	async getServiceInfo(idService: string): Promise<string | null> {
		const that = this;
		const app = that.app;
		const data = await app.firestore
			.collection("business")
			.doc(app.business.id)
			.collection("services")
			.doc(idService)
			.get()
			.then((snap) => {
				if (snap.exists) return snap.data();
				return null;
			})
			.catch((err) => {
				return null;
			});
		if (data !== null) {
			if (typeof data.idBusiness !== "undefined") {
				return data.idBusiness;
			}
		}
		return null;
	}
	getRouterInfo(idRouter: string) {
		const that = this;
		const app = that.app;
		return new Promise<RouterInfo>((resolve, reject) => {
			try {
				app.firestore
					.collection("routers")
					.doc(idRouter)
					.get()
					.then((snap) => {
						if (snap.exists) {
							const data = new RouterInfo(snap);
							resolve(data);
							return;
						}
						reject(null);
					})
					.catch((err) => {
						reject(null);
					});
			} catch (error) {
				reject(null);
			}
		});
	}
	changeWifiLogin(wifi: string, password: string) {
		const that = this;
		const app = that.app;

		const docTest = app.firestore.collection("test").doc("a");
	}
	onWifiChangesRequest(callBack: (data: CustomerWifiChange[]) => void) {
		const that = this;
		const app = that.app;
		const unsubs = app.firestore
			.collection("business")
			.doc(app.business.id)
			.collection("wifiChanges")
			.where("complete", "==", false)
			.onSnapshot(
				async (snap) => {
					const arrResult: CustomerWifiChange[] = [];
					const arr: FireDoc[] = [];
					snap.docs.forEach((item) => arr.push(item));
					for (const item of arr) {
						const data: WifiChangeRequest = <any>item.data();
						data.id = item.id;
						data.fireDoc = item;
						const customer =
							await that.customer.getCustomerSelenium(
								app.business,
								data.idCustomer
							);

						arrResult.push({
							customer: customer,
							change: data,
						});
					}
					callBack(arrResult);
				},
				(err) => {
					console.log(err);
					callBack([]);
				}
			);
		return unsubs;
		//
	}
	onRoutersAnalyzeRequest(callBack: (data: TestRouter[]) => void) {
		const that = this;
		const app = that.app;
		// const idBusiness = app.business.id;
		const unsubs = app.firestore
			.collection("business")
			.doc(app.business.id)
			.collection("analyzeRouters")
			.where("state", "==", "started")
			.onSnapshot(
				async (snap) => {
					const arr: TestRouterSimple[] = [];
					snap.docs.forEach((item) => {
						const data: any = item.data();
						data.doc = item;
						arr.push(data);
					});
					const arrPlus: TestRouter[] = [];

					for (const testRouter of arr) {
						const customer =
							await that.app.api.customer.getCustomer(
								app.business,
								testRouter.idCustomer
							);
						arrPlus.push({
							customer: customer,
							state: testRouter.state,
							creator: testRouter.creator,
							updateTestDoc: (data) => {
								const dataUpdated: TestRouterSimple = {
									state: data.state,
									idCustomer: data.idCustomer,
									creator: data.creator,
								};
								testRouter.doc?.ref.set(dataUpdated);
							},
						});
					}
					callBack(arrPlus);
				},
				(err) => {
					console.log(err);
					callBack([]);
				}
			);
		return unsubs;
		//
	}
}
export default FireDatabase;
