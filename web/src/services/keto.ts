import { Role } from "services/abac";
import axios, { AxiosResponse } from "axios";
import { BACKEND_ROOT_URL } from "config/backend";

export class KetoApi {
    baseUrl: string
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    whoami = async () => {
        return new Promise<{ message: string, role: Role }>((resolve, reject) => {
            axios.get<any, AxiosResponse<{ message: string, role: Role.ANONYMOUS }>>(this.baseUrl, {
                withCredentials: true
            }).then((resp) => { resolve(resp.data) }).catch(() => { resolve({ message: "failed", role: Role.ADMIN }) })
        })
    }
}

export const keto = new KetoApi(`${BACKEND_ROOT_URL}/.ory/keto/public/whoami`)