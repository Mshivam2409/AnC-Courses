const urlBackend = (path: string) => {
    return process.env.NODE_ENV === "production" ? `/api/${path}` : `https://anc-courses.herokuapp.com/api/${path}`
}

export default urlBackend