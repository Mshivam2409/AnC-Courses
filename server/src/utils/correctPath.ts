import { PathLike } from "fs"

const correctPath = (path: string | PathLike) => {
    return `${process.env.NODE_ENV === "development" ? "src" : "."}/${path}`
}

export default correctPath