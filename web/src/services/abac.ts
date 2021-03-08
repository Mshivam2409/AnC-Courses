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
    CREATE_REVIEW = "CREATE_REVIEW",
    MODERATE_REVIEW = "MODERATE_REVIEW",
    CREATE_FILE = "CREATE_FILE",
    DELETE_FILE = "DELETE_FILE",
    ELEVATE_USER = "ELEVATE_USER",
    DEMOTE_USER = "DEMOTE_USER",
    BAN_USER = "BAN_USER"
}

export enum Role {
    BANNED = "BANNED",
    ANONYMOUS = "ANONYMOUS",
    USER = "USER",
    MANAGER = "MANAGER",
    ADMIN = "ADMIN",
}

// rules describing what roles have what permissions
export const rules: Rules<Role, permissions, User> = {
    [Role.ADMIN]: {
        [permissions.LOGIN_CPANEL]: true,
        [permissions.CREATE_COURSE]: true,
        [permissions.MODIFY_COURSE]: true,
        [permissions.DELETE_COURSE]: true,
        [permissions.CREATE_REVIEW]: true,
        [permissions.MODERATE_REVIEW]: true,
        [permissions.CREATE_FILE]: true,
        [permissions.DELETE_FILE]: true,
        [permissions.ELEVATE_USER]: true,
        [permissions.DEMOTE_USER]: true,
        [permissions.DEMOTE_USER]: true,
        [permissions.BAN_USER]: true

    },
    [Role.MANAGER]: {
        [permissions.LOGIN_CPANEL]: true,
        [permissions.CREATE_COURSE]: true,
        [permissions.MODIFY_COURSE]: true,
        [permissions.DELETE_COURSE]: false,
        [permissions.CREATE_REVIEW]: true,
        [permissions.MODERATE_REVIEW]: true,
        [permissions.CREATE_FILE]: true,
        [permissions.DELETE_FILE]: false,
        [permissions.ELEVATE_USER]: false,
        [permissions.DEMOTE_USER]: false,
        [permissions.DEMOTE_USER]: false,
        [permissions.BAN_USER]: false
    },
    [Role.USER]: {
        [permissions.LOGIN_CPANEL]: false,
        [permissions.CREATE_COURSE]: false,
        [permissions.MODIFY_COURSE]: false,
        [permissions.DELETE_COURSE]: false,
        [permissions.CREATE_REVIEW]: true,
        [permissions.MODERATE_REVIEW]: false,
        [permissions.CREATE_FILE]: false,
        [permissions.DELETE_FILE]: false,
        [permissions.ELEVATE_USER]: false,
        [permissions.DEMOTE_USER]: false,
        [permissions.DEMOTE_USER]: false,
        [permissions.BAN_USER]: false
    },
    [Role.ANONYMOUS]: {

    }
};
