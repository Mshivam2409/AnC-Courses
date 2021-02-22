import { Role } from "services/abac"
import { KRATOS_SESSION } from "services/kratos"
import { atom } from "recoil"

const SESSION_STATE = atom<KRATOS_SESSION>({
    key: "SESSION_STATE",
    default: { active: false, role: Role.ADMIN }
})

export { SESSION_STATE }