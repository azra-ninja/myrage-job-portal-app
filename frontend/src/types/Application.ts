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
  success: boolean;
  count: number;
  applications: Application[];
}

export interface ApplicationInput {
    status: string;
}