import { LoginFlow, RegistrationFlow, PublicApi, SettingsFlow, VerificationFlow, RecoveryFlow, Session } from "@ory/kratos-client"
import { AxiosResponse } from "axios"
import config from "config/kratos"
import { Role } from "./abac"

export const kratos = new PublicApi({ basePath: config.kratos.browser })

export type KRATOS_SESSION = (Session | { active: boolean }) & { role: Role }

export const initialiseRequest = ({ type }: { type: "login" | "register" | "settings" | "verify" | "recover" }): Promise<LoginFlow | RegistrationFlow | SettingsFlow | VerificationFlow | RecoveryFlow> => {
    const endpoints = {
        login: `${config.kratos.browser}/self-service/login/browser`,
        register: `${config.kratos.browser}/self-service/registration/browser?refresh=true`,
        settings: `${config.kratos.browser}/self-service/browser/flows/settings`,
        verify: `${config.kratos.public}/self-service/browser/flows/verification/init/email`,
        recover: `${config.kratos.public}/self-service/browser/flows/recovery`
    }

    return new Promise((resolve, reject) => {
        const params = new URLSearchParams(window.location.search)
        const request = params.get("flow") || ""
        console.log(request)
        const endpoint = endpoints[type]

        // Ensure request exists in params.
        if (!request) return window.location.href = endpoint

        let authRequest: Promise<any> | undefined
        if (type === "login") authRequest = kratos.getSelfServiceLoginFlow(request)
        else if (type === "register") authRequest = kratos.getSelfServiceRegistrationFlow(request)
        // else if (type === "settings") authRequest = kratos.getSelfServiceSettingsFlow(request)
        // else if (type === "verify") authRequest = kratos.getSelfServiceVerificationFlow(request)
        // else if (type === "recover") authRequest = kratos.getSelfServiceRecoveryFlow(request)

        if (!authRequest) return reject()

        authRequest.then((response: AxiosResponse<any>) => {
            console.log(response)
            if (response.status !== 200)
                return reject(response)
            resolve(response.data)
        }).catch(error => {
            console.log(error)
            return reject()
        })
    })
}