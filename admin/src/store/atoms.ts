import { atom } from "recoil"

const FilesToUpload = atom<File[]>({
    key: "FILES",
    default: []
})

const User = atom({
    key: "USER",
    default: {
        loggedIn: false,
        username: "string",
        token: ""
    }
})

export { FilesToUpload, User }