export interface Application {
    _id: string;
    userId: string;
    jobId: string;
    resume: string;
    status: string;
}

export interface ApplicationInput {
    status: string;
}