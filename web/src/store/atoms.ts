import { Session } from "@oryd/kratos-client"
import { atom } from "recoil"

const SESSION_STATE = atom<Session | undefined>({
    key: "SESSION_STATE",
    default: undefined
})