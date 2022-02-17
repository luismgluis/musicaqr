"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dates_1 = require("./Dates");
const GeneralUtils_1 = require("./GeneralUtils");
const Objects_1 = require("./Objects");
const TAG = "UTILS";
class Utils extends GeneralUtils_1.default {
    constructor() {
        super();
        this.dates = new Dates_1.default();
        this.objects = new Objects_1.default();
    }
    getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    rulethree(valueA, valueAEqual, valueB) {
        //si valueA seria valueAEqual entonces valueB seria... return
        return (valueAEqual * valueB) / valueA;
    }
    timeOut(milisecs) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve(true);
                }, milisecs);
            }
            catch (error) {
                reject(null);
            }
        });
    }
    openUrl(url) {
        const w = window;
        w.open(url, "_blank").focus();
    }
    isNum(val) {
        if (!isNaN(val))
            return true;
        return false;
    }
    getNameLastName(name) {
        const obj = {
            name: "",
            lastName: "",
        };
        if (name.includes(" ")) {
            const ss = name.split(" ");
            obj.name = ss[0];
            obj.lastName = ss[1];
            return obj;
        }
        obj.name = name;
        return obj;
    }
    getListSeparator_bis() {
        const list = ["a", "b"];
        const s = list.toLocaleString().charAt(1);
        return s;
    }
    getRegexTextCoincidence(text) {
        const words = [...text.split(" ")];
        return new RegExp(words.join("|"));
    }
    includes(str, value) {
        if (str.indexOf(value) !== -1) {
            return true;
        }
        return false;
    }
}
exports.default = new Utils();
//# sourceMappingURL=utils.js.map