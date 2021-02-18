import { permissions, rules, Role } from "auth/abac"
import PrivateRoute from "auth/PrivateRoute"
import { Session } from "@ory/kratos-client"
export type KRATOS_SESSION = (Session | { active: boolean }) & { role: Role }

export { PrivateRoute, permissions, rules, Role }
