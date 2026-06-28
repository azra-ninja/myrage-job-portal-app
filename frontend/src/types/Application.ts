export interface Application {
  _id: string;
  userId?: {
    _id: string;
    name: string;
    email: string;
  };
  jobId: {
    _id: string;
    title: string;
    company: string;
  };
  resume: string;
  status: string;
  createdAt: string;
}

export interface ApplicationResponse {
  applications: Application[];
  count: number;
  currentPage: number;
  totalPages: number;
  totalJobs: number;
}

export interface ApplicationInput {
    status: string;
}