"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const googleapis_1 = require("googleapis");
const correctPath_1 = __importDefault(require("utils/correctPath"));
const buffertoStream_1 = __importDefault(require("utils/buffertoStream"));
class GoogleDriveStorageEngine {
    constructor(TOKEN_PATH, CREDENTIALS_PATH) {
        this._updateToken = () => __awaiter(this, void 0, void 0, function* () {
            const { client_secret, client_id } = this.CREDENTIALS.web;
            let resp = yield axios_1.default.post("https://accounts.google.com/o/oauth2/token", {
                client_id: client_id,
                client_secret: client_secret,
                refresh_token: this.OLD_TOKEN.refresh_token,
                grant_type: "refresh_token",
            });
            this.NEW_TOKEN = resp.data;
        });
        this._createFolder = (folderName) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const oAuth2Client = new googleapis_1.google.auth.OAuth2(this.CREDENTIALS.web.client_id, this.CREDENTIALS.web.client_secret, this.CREDENTIALS.web.redirect_uris[0]);
                oAuth2Client.setCredentials(this.NEW_TOKEN);
                const drive = googleapis_1.google.drive({ version: 'v3', auth: oAuth2Client });
                drive.files.create({
                    requestBody: {
                        name: folderName,
                        mimeType: 'application/vnd.google-apps.folder'
                    },
                    fields: "id"
                }, (err, file) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve((file === null || file === void 0 ? void 0 : file.data.id) || "");
                    }
                });
            });
        });
        this._uploadFile = (file, parentFolder) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const oAuth2Client = new googleapis_1.google.auth.OAuth2(this.CREDENTIALS.web.client_id, this.CREDENTIALS.web.client_secret, this.CREDENTIALS.web.redirect_uris[0]);
                oAuth2Client.setCredentials(this.NEW_TOKEN);
                const drive = googleapis_1.google.drive({ version: 'v3', auth: oAuth2Client });
                drive.files.create({
                    requestBody: {
                        name: file.originalname,
                        mimeType: file.mimetype,
                        parents: [parentFolder]
                    },
                    media: {
                        mimeType: file.mimetype,
                        body: buffertoStream_1.default(file.buffer)
                    },
                    fields: "id"
                }, (err, filex) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve((filex === null || filex === void 0 ? void 0 : filex.data.id) || "");
                    }
                });
            });
        });
        this._handleNewCourse = (files, courseData) => __awaiter(this, void 0, void 0, function* () {
            yield this._updateToken();
            const folderId = yield this._createFolder(courseData.number);
            var response = {
                folderId: folderId,
                files: []
            };
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const fileId = yield this._uploadFile(file, folderId);
                response.files.push(JSON.stringify({ fileId: fileId, name: file.originalname }));
            }
            return response;
        });
        this.CREDENTIALS = JSON.parse(fs_1.default.readFileSync(correctPath_1.default(CREDENTIALS_PATH), { encoding: 'utf-8' }));
        this.OLD_TOKEN = JSON.parse(fs_1.default.readFileSync(correctPath_1.default(TOKEN_PATH), { encoding: 'utf-8' }));
        this.NEW_TOKEN = this.OLD_TOKEN;
    }
}
const GoogleDriveStorage = new GoogleDriveStorageEngine(process.env.TOKEN_PATH, process.env.CREDENTIALS_PATH);
exports.default = GoogleDriveStorage;
//# sourceMappingURL=googleDriveEngine.js.map