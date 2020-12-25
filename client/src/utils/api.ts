const url = (path: string) => {
    return process.env.NODE_ENV === "production" ? `https://anciitk-courses.herokuapp.com/api/${path}` : `http://localhost:5000/api/${path}`
}

export default url