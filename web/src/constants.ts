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

export const depts = ["AE", "ART", "BSE", "CE", "CHE", "CHM", "CS", "CSO", "DES", "ECO", "EE", "EEM", "ENG", "ES", "ESC", "ESO", "IME", "PHY", "LIF", "LT", "MBA", "ME", "MSE", "MSO", "MTH", "NT", "PHI", "PHY", "PSY", "SE", "SOC", "TA"];

const offerings_sub = [
    {
        value: 'Even',
        label: 'Even',
    },
    {
        value: 'Odd',
        label: 'Odd',
    },
]

export const offerings = [
    {
        value: '19-20',
        label: '19-20',
        children: offerings_sub
    },
    {
        value: '20-21',
        label: '19-20',
        children: offerings_sub
    }, {
        value: '18-19',
        label: '18-19',
        children: offerings_sub
    },

];