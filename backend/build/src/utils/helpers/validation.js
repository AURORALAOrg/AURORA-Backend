"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
const pick = (passedObject, keys) => {
    return keys.reduce((obj, key) => {
        if (passedObject &&
            Object.prototype.hasOwnProperty.call(passedObject, key)) {
            obj[key] = passedObject[key];
        }
        return obj;
    }, {});
};
exports.pick = pick;
