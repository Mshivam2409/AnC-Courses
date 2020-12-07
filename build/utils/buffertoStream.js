"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream"); // Native Node Module 
const bufferToStream = (myBuuffer) => {
    let tmp = new stream_1.Duplex();
    tmp.push(myBuuffer);
    tmp.push(null);
    return tmp;
};
exports.default = bufferToStream;
//# sourceMappingURL=buffertoStream.js.map