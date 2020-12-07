"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const correctPath_1 = __importDefault(require("utils/correctPath"));
const adapter = new FileSync_1.default(correctPath_1.default("backup/backupDB.json"));
const backupDB = lowdb_1.default(adapter);
exports.default = backupDB;
//# sourceMappingURL=backup.js.map