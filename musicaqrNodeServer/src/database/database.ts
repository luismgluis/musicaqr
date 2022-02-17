import App from "../App";

import FireDatabaseBusiness from "./business/FireDatabaseBusiness";

class FireDatabase {
	app: App;

	business: FireDatabaseBusiness;

	constructor(app: App) {
		this.app = app;

		this.business = new FireDatabaseBusiness(app);
	}

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
}
export default FireDatabase;
