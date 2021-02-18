import { Role } from "auth/abac"
import { KRATOS_SESSION } from "auth"
import { atom } from "recoil"

const SESSION_STATE = atom<KRATOS_SESSION>({
    key: "SESSION_STATE",
    default: { active: false, role: Role.ANONYMOUS }
})

export { SESSION_STATE }