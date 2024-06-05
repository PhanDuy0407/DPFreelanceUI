export const JobStatus = {
    WAITING_FOR_APPROVE: {label: "Waiting for approve", value: "WAITING_FOR_APPROVE"},
    OPEN: {label: "Open", value: "OPEN"},
    DENY: {label: "Deny", value: "DENY"},
    REOPEN: {label: "Reopen", value: "REOPEN"},
    WORK_IN_PROGRESS: {label: "Work in progress", value: "WORK_IN_PROGRESS"},
    CLOSED: {label: "Closed", value: "CLOSED"},
    DONE: {label: "Done", value: "DONE"},
}

export const JobPricingStatus = {
    WAITING_FOR_APPROVE: {label: "Waiting for approve", value: "WAITING_FOR_APPROVE"},
    ACCEPTED: {label: "Accepted", value: "ACCEPTED"},
    DENY: {label: "Deny", value: "DENY"},
    REVOKE: {label: "Revoke", value: "REVOKE"},
    DONE: {label: "Done", value: "DONE"},
}

export const JobType = {
    PER_HOUR: {label: "Per hour", value: "PER_HOUR"},
    PER_PRJ: {label: "Per project", value: "PER_PRJ"},
}

export const skillOptions = [
    { value: "js", label: "JavaScript" },
    { value: "cpp", label: "C++" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "react", label: "React" },
    { value: "node", label: "NodeJS" },
    { value: "mongo", label: "MongoDB" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
];