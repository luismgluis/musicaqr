import utils from "../libs/utils/utils";

export interface BusinessInterface {
	id: string;
	name: string;
	at: string;
	email: string;
	description?: string;
	creationDate: number;
	isNull?: boolean;
	urlImg?: string;
}
export default class Business implements BusinessInterface {
	id: string;
	name: string;
	at: string;
	email: string;
	description?: string;
	creationDate: number;
	isNull?: boolean;
	urlImg?: string;
	constructor(data: BusinessInterface | null, isNull?: boolean) {
		this.name = data?.name || "";
		this.id = data?.id || "";
		this.at = data?.at || "";
		this.email = data?.email || "";
		this.description = data?.description || "";
		this.isNull = isNull || false; // check if Business has not initialized
		this.urlImg = data?.urlImg || "";
		this.creationDate = data?.creationDate || 0;
	}

	public get isEmpty(): boolean {
		return this.id === "";
	}
	validate() {
		if (this.name.length < 2) return false;
		if (!utils.validateEmail(this.email)) return false;
		if (this.creationDate <= 0) return false;
		return true;
	}
	exportObject() {
		const newOb = utils.objects.cloneObject(this);
		console.log(newOb);
		return newOb;
	}
}
