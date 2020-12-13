import { atom } from "recoil"
import { IBCourse } from "types"

const FilesToUpload = atom<File[]>({
    key: "FILES",
    default: []
})

const currentCourse = atom<IBCourse>({
    key: "CURRENT_COURSE",
    default: {
        id: "",
        title: "string",
        number: "strin",
        credits: "string,",
        offered: "string",
        contents: "string",
        reviews: [],
        driveFiles: []
    }
})
const User = atom({
    key: "USER",
    default: {
        loggedIn: true,
        username: "string",
        token: ""
    }
})

export { FilesToUpload, User, currentCourse }