import config from "config/kratos"

export const login = ({ setReferer = true } = {}) => {
    const { pathname } = window.location
    window.location.href = config.routes.login.path
}

export const register = ({ setReferer = true } = {}) => {
    const { pathname } = window.location
    window.location.href = config.routes.registration.path
}

export const logout = () => {
    const base = config.kratos.browser
    window.location.href = `${base}/self-service/browser/flows/logout`
}

export const refresh = () => {
    const base = config.kratos.browser
    window.location.href = `${base}/self-service/browser/flows/login?refresh=true&return_to=${config.baseUrl}/callback`
}