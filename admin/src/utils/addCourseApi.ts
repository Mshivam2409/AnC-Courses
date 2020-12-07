import { IBCourse } from "types";
import url from "utils/api";

const addCourse = async (course: IBCourse, author: string) => {
    const data = new FormData();
    data.append('courseDetails', JSON.stringify(course));
    data.append('author', author)
    const response = await fetch(url("secure/addCourse"), {
        method: "POST",
        body: data,
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