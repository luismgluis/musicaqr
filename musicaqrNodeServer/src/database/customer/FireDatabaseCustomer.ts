import App from "../../App";
import Business from "../../classes/Business";
import Customer, { CustomerSelenium } from "../../classes/Customer";

import utils from "../../libs/utils/utils";

const TAG = "FIRE DATABASE USER";
class FireDatabaseCustomer {
	private app: App;
	private allCustomer: any;
	constructor(app: App) {
		this.app = app;
		this.allCustomer = {};
	}

	getCustomersListener(
		business: Business,
		callback: (res: Customer[]) => void
	) {
		const that = this;
		const db = that.app.database();
		const unsubs = db
			.collection("business")
			.doc(business.id)
			.collection("customers")
			.onSnapshot(
				(result) => {
					if (!result.empty) {
						const arr: Customer[] = [];
						result.forEach((doc) => {
							const data: any = doc.data();
							data.id = doc.id;
							data.idDoc = doc.id;
							arr.push(new Customer(data));
						});
						callback(arr);
						return;
					}
					console.log(business);
					callback([]);
				},
				(err) => {
					console.log(err);
					callback([]);
				}
			);
		return unsubs;
	}
	getCustomer(cBusiness: Business, idCustomer: string) {
		const that = this;
		const db = this.app.database();
		return new Promise<Customer | CustomerSelenium>((resolve, reject) => {
			try {
				if (typeof that.allCustomer[idCustomer] !== "undefined") {
					const data: Customer = that.allCustomer[idCustomer];
					if (data instanceof Customer) {
						if (!data.isEmpty) {
							resolve(data);
						}
					}
					return;
				}
				db.collection("business")
					.doc(cBusiness.id)
					.collection("customers")
					.doc(idCustomer)
					.get()
					.then((result) => {
						if (result.exists) {
							const data: any = result.data();
							data.id = result.id;
							const customer = new CustomerSelenium(
								data,
								that.app,
								result
							);
							that.allCustomer[idCustomer] = customer;
							resolve(customer);
							return;
						}
						reject("Not user");
					})
					.catch((err) => {
						console.log("catch", err);
						reject(err);
					});
			} catch (error) {
				reject(error);
			}
		});
	}
	async getCustomerSelenium(cBusiness: Business, idCustomer: string) {
		const customer = <CustomerSelenium>(
			await this.getCustomer(cBusiness, idCustomer)
		);
		return customer;
	}
	saveCustomer(business: Business, customer: Customer) {
		const that = this;

		const saveOnMe = async () => {
			customer.creationDate = utils.dates.dateNowUnix();
			const res = await that.app
				.database()
				.collection("business")
				.doc(business.id)
				.collection("customers")
				.add(customer.exportObject())
				.then((doc) => doc)
				.catch(() => null);
			return res;
		};
		return new Promise<Customer>(async (resolve, reject) => {
			try {
				const resSaveOnMe = await saveOnMe();
				if (resSaveOnMe) {
					customer.id = resSaveOnMe.id;
					resolve(customer);
					return;
				}
				reject("Fail on add Customer");
			} catch (error) {
				reject(null);
			}
		});
	}
	modifyCustomer(business: Business, customer: Customer) {
		const that = this;
		const save = async () => {
			const dataUpload = customer.exportObject();
			const res = await that.app
				.database()
				.collection("business")
				.doc(business.id)
				.collection("customers")
				.doc(customer.id)
				.set(dataUpload)
				.then(() => true)
				.catch((err) => {
					return err;
				});
			if (res) {
				return true;
			}
			return null;
		};

		return new Promise<boolean>(async (resolve, reject) => {
			try {
				const resSave = await save();
				if (resSave) {
					resolve(true);
					return;
				}
				reject("Fail on add to me Customer");
			} catch (error) {
				reject(error);
			}
		});
	}
	removeCustomer(business: Business, customer: Customer) {
		const that = this;
		const remove = async () => {
			const res = await that.app
				.database()
				.collection("business")
				.doc(business.id)
				.collection("customers")
				.doc(customer.id)
				.delete()
				.then(() => true)
				.catch(() => null);
			return res;
		};

		return new Promise<boolean>(async (resolve, reject) => {
			try {
				const resAction = await remove();

				if (resAction) {
					resolve(true);
					return;
				}
				reject("Fail on remove this Customer");
			} catch (error) {
				reject(null);
			}
		});
	}
}

export default FireDatabaseCustomer;
