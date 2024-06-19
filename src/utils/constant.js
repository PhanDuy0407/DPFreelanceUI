export const JobStatus = {
    WAITING_FOR_APPROVE: {label: "Đang kiểm duyệt", value: "WAITING_FOR_APPROVE"},
    OPEN: {label: "Đang tuyển", value: "OPEN"},
    DENY: {label: "Không hợp lệ", value: "DENY"},
    REOPEN: {label: "Đang tuyển trở lại", value: "REOPEN"},
    CLOSED: {label: "Đã đóng", value: "CLOSED"},
    DONE: {label: "Đã tuyển", value: "DONE"},
}

export const JobApplyStatus = {
    WAITING_FOR_APPROVE: {label: "Đang ứng tuyển", value: "WAITING_FOR_APPROVE"},
    ACCEPTED: {label: "Đang thực hiện", value: "ACCEPTED"},
    DENY: {label: "Bị từ chối", value: "DENY"},
    REVOKE: {label: "Đã thu hồi", value: "REVOKE"},
    DONE: {label: "Hoàn thành", value: "DONE"},
}

export const JobType = {
    PER_HOUR: {label: "Theo giờ", value: "PER_HOUR"},
    PER_PRJ: {label: "Theo kíp", value: "PER_PRJ"},
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