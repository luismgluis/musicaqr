"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralUtils {
    constructor() {
        this.generateKeyCounter = 0;
    }
    generateKey(pre) {
        const key = `${pre}_${new Date().getTime()}_${this.generateKeyCounter}`;
        this.generateKeyCounter++;
        return key;
    }
    validateEmail(email) {
        if (email.length > 5 && email.includes("@") && !email.includes(" ")) {
            return true;
        }
        return false;
    }
    validateIp(ipaddress) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return true;
        }
        return false;
    }
    analyzeAnswerYesNo(text) {
        const regexYes = [
            /\byes+\b/i,
            /\bsi+\b/i,
            /\baceptar+\b/i,
            /\bclaro+\b/i,
            /\bconcedido+\b/i,
            /\bafirmativo+\b/i,
            /\baceptado+\b/i,
        ];
        const regexNo = [
            /\bno+\b/i,
            /\bnot+\b/i,
            /\bdenegar+\b/i,
            /\brechazar+\b/i,
            /\bclaro que no+\b/i,
            /\bnegativo+\b/i,
            /\bdenegado+\b/i,
        ];
        const analyze = (regex) => {
            const arr = text.match(regex);
            const result = [];
            arr === null || arr === void 0 ? void 0 : arr.forEach((item) => {
                result.push(item);
            });
            return result.length > 0;
        };
        for (const key in regexYes) {
            const regex = regexYes[key];
            if (analyze(regex))
                return "YES";
        }
        for (const key in regexNo) {
            const regex = regexYes[key];
            if (analyze(regex))
                return "NO";
        }
        return null;
    }
    stringWithLimit(str, limit = 0) {
        console.log("stringWithLimit");
        if (str.length <= limit)
            return str;
        return str.slice(0, limit);
    }
}
exports.default = GeneralUtils;
//# sourceMappingURL=GeneralUtils.js.map