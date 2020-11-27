import fs, { PathLike } from "fs";
import { IBCourse, GoogleCredentials, GoogleToken } from "types";
import Axios from "axios"
import { google } from "googleapis"
import correctPath from "utils/correctPath";
import bufferToStream from "utils/buffertoStream";

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
            fileIds: Array<string>
        } = {
            folderId: folderId,
            fileIds: []
        }
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const fileId = await this._uploadFile(file, folderId)
            response.fileIds.push(fileId)
        }
        return response
    }
}


const GoogleDriveStorage = new GoogleDriveStorageEngine(process.env.TOKEN_PATH as string, process.env.CREDENTIALS_PATH as string);

export default GoogleDriveStorage

