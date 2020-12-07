export interface IReview {
    _id: string
    semester: string,
    instructor: string,
    grading: string,
    course: Types.ObjectId
}
export interface ICourse {
    _id: string
    title: string
    number: string
    credits: string
    offered: string
    contents: string
    driveFolder: string,
    driveFiles: Array<string>
    reviews: Array<any>
    author: string
    dept: string
}