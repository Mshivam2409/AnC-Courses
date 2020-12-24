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
        dept: '',
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

const ModalOpen = atom({
    key: 'MODAL_OPEN',
    default: false
})

const Loading = atom({
    key: 'LOADING',
    default: false
})

export { FilesToUpload, User, currentCourse, ModalOpen, Loading }