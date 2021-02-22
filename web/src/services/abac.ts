import { Rules } from "react-abac"

interface User {
    uuid: string;
    roles: Role[];
    permissions: permissions[];
}

// an object with all permissions
export enum permissions {
    LOGIN_CPANEL = "LOGIN_CPANEL",
    CREATE_COURSE = "CREATE_USER",
    MODIFY_COURSE = "EDIT_POST",
    DELETE_COURSE = "DELETE_COURSE",
    CREATE_FILE = "CREATE_FILE",
    DELETE_FILE = "DELETE_FILE",
    CREATE_SECY = "CREATE_SECY",
    DELETE_SECY = "DELETE_SECY",
    CREATE_COORDI = "CREATE_COORDI",
    DELETE_COORDI = "DELETE_COORDI",
    CREATE_ADMIN = "CREATE_ADMIN"
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    COORDI = "COORDI",
    SECY = "SECY",
    ANONYMOUS = "ANONYMOUS",
    BANNED = "BANNED",
}

// rules describing what roles have what permissions
export const rules: Rules<Role, permissions, User> = {
    [Role.ADMIN]: {
        [permissions.MODIFY_COURSE]: true,
        [permissions.LOGIN_CPANEL]: true
    },
    [Role.USER]: {
        // an abac rule
        // user can only edit the post if it is the owner of it
        [permissions.MODIFY_COURSE]: false,
        [permissions.LOGIN_CPANEL]: false
    }
};
