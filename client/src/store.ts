import { atom } from "recoil";

const UserState = atom({
    key: 'USER',
    default: {
        username: "",
        token: "",
        loggedIn: false
    }
})

export {UserState}