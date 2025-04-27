"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCache = exports.cacheHandler = void 0;
// CACHE LOGIKA - PRIMER ISPRAVNE SINTAKSE
const functions = require("firebase-functions");
const cacheHandler = (data) => {
    return {
        data,
        timestamp: Date.now()
    };
};
exports.cacheHandler = cacheHandler;
exports.testCache = functions.https.onRequest((req, res) => {
    const cachedData = (0, exports.cacheHandler)({ example: 'test' });
    res.send(cachedData);
});
