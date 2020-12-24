export interface IBReview {
    semester: string,
    instructor: string,
    grading: string,
    course: string
}

export interface IBCourse {
    title: string
    number: string
    credits: string
    offered: string
    contents: string
    reviews: Array<IBReview>
    driveFiles: Array<string>
    id: string
    dept: string
}