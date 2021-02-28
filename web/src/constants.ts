interface FormLabel {
    label: string;
    priority: number;
}

export const FORM_LABELS: { [key: string]: FormLabel } = {
    "to_verify": {
        label: "Email",
        priority: 100
    },
    "csrf_token": {
        label: "",
        priority: 100
    },
    "traits.email": {
        label: "Email",
        priority: 90,
    },
    email: {
        label: "Email",
        priority: 80
    },
    identifier: {
        label: "Email",
        priority: 80
    },
    password: {
        label: "Password",
        priority: 80
    }
}

export const depts = ["AE", "ART", "BSE", "CE", "CHE", "CHM", "CS", "DES", "ECO", "EE", "EEM", "ENG", "ES", "ESC", "ESO", "IME", "PHY", "LIF", "LT", "MBA", "ME", "MSE", "MSO", "MTH", "NT", "PHI", "PHY", "PSY", "SE", "SOC", "TA"];

export interface IBReview {
    id: string
    semester: string,
    instructor: string,
    grading: string,
    // course: string
}

export interface IBCourse {
    readonly title: string;
    readonly number: string;
    readonly credits: string;
    readonly offered: string;
    readonly contents: string;
    readonly author: string;
    readonly reviews: ReadonlyArray<{
        readonly id: string;
        readonly semester: string;
        readonly instructor: string;
        readonly grading: string;
    }>;
    readonly driveFiles: ReadonlyArray<string>;
    readonly id: string;
    readonly dept: string;
}