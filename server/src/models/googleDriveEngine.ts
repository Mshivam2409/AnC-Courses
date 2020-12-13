import fs, { PathLike } from "fs";
import { IBCourse, GoogleCredentials, GoogleToken } from "types";
import Axios from "axios"
import { google } from "googleapis"
import correctPath from "utils/correctPath";
import bufferToStream from "utils/buffertoStream";
import concat from "concat-stream";

class GoogleDriveStorageEngine {
    OLD_TOKEN: GoogleToken
    NEW_TOKEN: GoogleToken
    CREDENTIALS: GoogleCredentials
    constructor(TOKEN_PATH: PathLike, CREDENTIALS_PATH: PathLike) {
        this.CREDENTIALS = JSON.parse(fs.readFileSync(correctPath(CREDENTIALS_PATH), { encoding: 'utf-8' }))
        this.OLD_TOKEN = JSON.parse(fs.readFileSync(correctPath(TOKEN_PATH), { encoding: 'utf-8' }))
        this.NEW_TOKEN = this.OLD_TOKEN
    }
    _updateToken = async () => {
        const { client_secret, client_id } = this.CREDENTIALS.web;
        let resp = await Axios.post("https://accounts.google.com/o/oauth2/token", {
            client_id: client_id,
            client_secret: client_secret,
            refresh_token: this.OLD_TOKEN.refresh_token,
            grant_type: "refresh_token",
        })
        this.NEW_TOKEN = resp.data;
    }
    _createFolder = async (folderName: string) => {
        return new Promise<string>((resolve, reject) => {
            const oAuth2Client = new google.auth.OAuth2(this.CREDENTIALS.web.client_id, this.CREDENTIALS.web.client_secret, this.CREDENTIALS.web.redirect_uris[0]);
            oAuth2Client.setCredentials(this.NEW_TOKEN);
            const drive = google.drive({ version: 'v3', auth: oAuth2Client });
            drive.files.create({
                requestBody: {
                    name: folderName,
                    mimeType: 'application/vnd.google-apps.folder'
                },
                fields: "id"
            }, (err, file) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(file?.data.id || "")
                }
            });
        })
    }
    _uploadFile = async (file: Express.Multer.File, parentFolder: string) => {
        return new Promise<string>((resolve, reject) => {
            const oAuth2Client = new google.auth.OAuth2(this.CREDENTIALS.web.client_id, this.CREDENTIALS.web.client_secret, this.CREDENTIALS.web.redirect_uris[0]);
            oAuth2Client.setCredentials(this.NEW_TOKEN);
            const drive = google.drive({ version: 'v3', auth: oAuth2Client });

            drive.files.create({
                requestBody: {
                    name: file.originalname,
                    mimeType: file.mimetype,
                    parents: [parentFolder]
                },
                media: {
                    mimeType: file.mimetype,
                    body: bufferToStream(file.buffer)
                },
                fields: "id"
            }, (err, filex) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(filex?.data.id || "")
                }
            });
        })
    }
    _handleNewCourse = async (files: Array<Express.Multer.File>, courseData: IBCourse) => {
        await this._updateToken();
        const folderId = await this._createFolder(courseData.number)
        var response: {
            folderId: string,
            files: Array<string>
        } = {
            folderId: folderId,
            files: []
        }
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const fileId = await this._uploadFile(file, folderId)
            response.files.push(JSON.stringify({ fileId: fileId, name: file.originalname }))
        }
        return response
    }
    _handleFiles = async (files: Express.Multer.File[], parentId: string) => {
        const response: string[] = []
        try {
            await this._updateToken();
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const fileId = await this._uploadFile(file, parentId);
                response.push(JSON.stringify({ fileId: fileId, name: file.originalname }))
            }
            return response
        } catch (error) {
            return response
        }
    }
    _getFile = async (fileId: string) => {
        await this._updateToken()
        return new Promise<Buffer>((resolve, reject) => {
            const oAuth2Client = new google.auth.OAuth2(this.CREDENTIALS.web.client_id, this.CREDENTIALS.web.client_secret, this.CREDENTIALS.web.redirect_uris[0]);
            oAuth2Client.setCredentials(this.NEW_TOKEN);
            const drive = google.drive({ version: 'v3', auth: oAuth2Client });

            drive.files.get({
                fileId: fileId,
                alt: 'media'
            }, {
                responseType: 'stream'
            },
                (err, res): void => {
                    if (res)
                        res.data.pipe(concat((data) => {
                            resolve(data);
                        }))
                    if (err) {
                        reject(err);
                    }
                }
            )
        })
    }
}


const GoogleDriveStorage = new GoogleDriveStorageEngine(process.env.TOKEN_PATH as string, process.env.CREDENTIALS_PATH as string);

export default GoogleDriveStorage

