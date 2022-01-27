import App from "../App";
import FireDatabaseBusiness from "./business/FireDatabaseBusiness";
import FireDatabaseCustomer from "./customer/FireDatabaseCustomer";
import FireDatabaseRouters from "./routers/FireDatabaseRouters";
import FireDatabaseUser from "./user/FireDatabaseUser";

class Database {
  user: FireDatabaseUser;
  business: FireDatabaseBusiness;
  routers: FireDatabaseRouters;
  customer: FireDatabaseCustomer;
  constructor(app: App) {
    this.user = new FireDatabaseUser(app);
    this.business = new FireDatabaseBusiness(app);
    this.routers = new FireDatabaseRouters(app);
    this.customer = new FireDatabaseCustomer(app);
  }
}
export default Database;
