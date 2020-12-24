import { IBCourse } from "types";
import urlBackend from "config/api";

const addCourse = async (course: IBCourse, author: string, token: string) => {
    const data = new FormData();
    data.append('courseDetails', JSON.stringify(course));
    data.append('author', author)
    const response = await fetch(urlBackend("secure/addCourse"), {
        method: "POST",
        body: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (!response.ok)
        return {
            message: "We are having trouble connecting to the servers, please try after some time",
            valid: false
        }
    const responseData = await response.json();
    return {
        message: responseData,
        valid: true
    }
}

export default addCourse