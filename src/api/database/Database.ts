import App from "../App";
import FireDatabaseBusiness from "./business/FireDatabaseBusiness";

import FireDatabaseUser from "./user/FireDatabaseUser";

class Database {
	user: FireDatabaseUser;
	business: FireDatabaseBusiness;

	constructor(app: App) {
		this.user = new FireDatabaseUser(app);
		this.business = new FireDatabaseBusiness(app);
	}
}
export default Database;
