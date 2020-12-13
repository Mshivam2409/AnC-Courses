const url = (path: string) => {
    return process.env.NODE_ENV === "production" ? `https://anc-courses.herokuapp.com/api/${path}` : `https://anc-courses.herokuapp.com/api/${path}`
}

export default url