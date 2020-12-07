"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const correctPath = (path) => {
    return `${process.env.NODE_ENV === "development" ? "src" : "."}/${path}`;
};
exports.default = correctPath;
//# sourceMappingURL=correctPath.js.map