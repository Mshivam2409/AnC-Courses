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
    dept: string
}

export interface IFile {
    name: string,
    mimeType: string,
    parentFolder: string,
}

export interface GoogleCredentials {
    web: {
        client_id: string;
        project_id: string;
        auth_uri: string;
        token_uri: string;
        auth_provider_x509_cert_url: string;
        client_secret: string;
        redirect_uris: string[];
    }
}

export interface GoogleToken {
    access_token: string;
    scope: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
}

