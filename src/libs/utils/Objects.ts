import GeneralUtils from "./GeneralUtils";

export interface arrayHasObjectChildEqualToType {
	isEqual: boolean;
	item: any;
}

export default class Objects {
	general: GeneralUtils;
	constructor() {
		this.general = new GeneralUtils();
		/** */
	}
	isEmpty(obj: any): boolean {
		if (typeof obj === "undefined") {
			return true;
		}
		if (obj == null) {
			return true;
		}
		if (typeof obj === "object") {
			if (Object.keys(obj).length === 0) {
				return true;
			}
		}
		return false;
	}
	hasDiferences(obj1: any, obj2: any) {
		for (const key in obj1) {
			if (Object.prototype.hasOwnProperty.call(obj2, key)) {
				if (obj1[key] !== obj2[key]) {
					if (typeof obj1[key] !== "function") {
						return true;
					}
				}
			} else {
				return true;
			}
		}
		return false;
	}
	uploadObjFromObj(obj1: any, obj2: any) {
		for (const key in obj1) {
			if (typeof obj1[key] === "function") {
				continue;
			}
			if (Object.prototype.hasOwnProperty.call(obj2, key)) {
				obj1[key] = obj2[key];
			}
		}
		return obj1;
	}
	cloneObject(obj: any): any {
		const nb: any = {};
		for (const key in obj) {
			if (!Object.prototype.hasOwnProperty.call(obj, key)) {
				continue;
			}
			const element = obj[key];
			nb[key] = element;
		}
		return nb;
	}
	arrayHasObjectChildEqualTo(
		arr: Array<any>,
		key: string,
		equalToThis: any
	): arrayHasObjectChildEqualToType {
		for (const keyCallB in arr) {
			if (!Object.prototype.hasOwnProperty.call(arr, keyCallB)) {
				continue;
			}
			const element = arr[keyCallB];
			if (element[key] === equalToThis) {
				return {
					isEqual: true,
					item: element,
				};
			}
		}
		return {
			isEqual: false,
			item: null,
		};
	}
	arrayOrderDesc(array: Array<any>, childName = "") {
		const that = this;
		function compareIPAddresses(a: string, b: string) {
			const transform = (e: string) => {
				return Number(
					e
						.split(".")
						.map(
							(num, idx) =>
								parseInt(num) * Math.pow(2, (3 - idx) * 8)
						)
						.reduce((a, v) => ((a += v), a), 0)
				);
			};

			const numA = Number(
				a
					.split(".")
					.map(
						(num, idx) => parseInt(num) * Math.pow(2, (3 - idx) * 8)
					)
					.reduce((a, v) => ((a += v), a), 0)
			);
			const numB = Number(
				b
					.split(".")
					.map(
						(num, idx) => parseInt(num) * Math.pow(2, (3 - idx) * 8)
					)
					.reduce((a, v) => ((a += v), a), 0)
			);
			return numA - numB;
		}
		function compare(a: any, b: any) {
			const childA = a[childName];
			const childB = b[childName];
			if (that.general.validateIp(childA)) {
				if (that.general.validateIp(childB)) {
					return compareIPAddresses(childA, childB);
				}
			}
			if (typeof childA === "undefined") {
				return 0;
			}
			if (typeof childB === "undefined") {
				return 0;
			}
			if (childA < childB) {
				return -1;
			}
			if (childA > childB) {
				return 1;
			}
			return 0;
		}
		return [...array].sort(compare); // clone and sort
	}
	arrayOrderAsc(array: Array<any>, childName = "") {
		function compare(a: any, b: any) {
			if (typeof a[childName] === "undefined") {
				return 0;
			}
			if (typeof b[childName] === "undefined") {
				return 0;
			}
			if (a[childName] < b[childName]) {
				return 1;
			}
			if (a[childName] > b[childName]) {
				return -1;
			}
			return 0;
		}
		return [...array].sort(compare); // clone and sort
	}
	arrayLastItem(array = []): any {
		const [lastItem] = array.slice(-1);
		return lastItem;
	}
}
