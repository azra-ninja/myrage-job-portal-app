import axios from "axios";
import { constants } from "../constants/constants";
import type {
  LoginUserResponse,
  User,
  RegisterUserResponse,
  CreateUserInput,
  LoginUserInput,
} from "../types/User";
import type { Job, JobInput } from "../types/Job";
import type { ApplicationInput, ApplicationResponse } from "../types/Application";

const api = axios.create({
  baseURL: constants.BASE_URL,
});

// for token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// for 404 pages
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 404) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);

// Auth api function
// Register function
export const registerUser = async (data: FormData) => {
  const res = await api.post<RegisterUserResponse>("/auth/register", data);
  return res.data;
};

// Login function
export const loginUser = async (data: LoginUserInput) => {
  const res = await api.post<LoginUserResponse>("/auth/login", data);
  return res.data;
};

// Job api function
// Get all jobs function
export const getAllJobs = async (page: number) => {
  const res = await api.get(`/jobs?page=${page}&limit=6`);
  return res.data;
};

// Get a single job(using job id) function
export const getJobById = async (id: string): Promise<Job> => {
  const res = await api.get<Job>(`/jobs/${id}`);
  return res.data;
};

// Get trending jobs
export const getTrendingJobs = async (): Promise<Job[]> => {
  const res = await api.get<Job[]>("/jobs/trending-jobs/");
  return res.data;
}

// Search jobs
export const searchJobs = async (search: string) => {
  const res = await api.get(`/jobs/search?q=${search}`);
  return res.data;
}

// Create job function
export const createJob = async (data: JobInput) => {
  const res = await api.post("/jobs/", data);
  return res.data;
};

// Update job function
export const updateJob = async (id: string, data: Partial<JobInput>) => {
  const res = await api.put(`/jobs/${id}`, data);
  return res.data as JobInput;
};

// Delete job function
export const deleteJob = async (id: string): Promise<void> => {
  await api.delete(`/jobs/${id}`);
};

// User api function
// Get all user function
export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/users/");
  return res.data;
};

export const getProfile = async (): Promise<User> => {
  const res = await api.get<User>("/users/profile");
  return res.data;
}

// Get a single user(using job id) function
export const getUserById = async (id: string): Promise<User> => {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
}

// Create user function
export const createUser = async (data: CreateUserInput) => {
  const res = await api.post("/users/", data);
  return res.data;
}

// Update user function
export const updateUser = async (id: string, data: FormData) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
}

// Delete user function
export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
}

// Application functions
// Get all applications function 
export const getApplications = async (): Promise<ApplicationResponse> => {
  const res = await api.get<ApplicationResponse>("/applications/");
  return res.data;
}

// Apply application function
export const applyApplication = async (jobId: string) => {
  const res = await api.post(`/applications/${jobId}/apply`);
  return res.data;
}

// Update application function
export const updateApplication = async (id: string, data: Partial<ApplicationInput>) => {
  const res = await api.put(`/applications/${id}`, data);
  return res.data as ApplicationInput;
}

// Delete application function
export const deleteApplication = async (id: string) => {
  await api.delete(`/applications/${id}`);
}

// Dashboard stats
export const dashboardStats = async () => {
  const res = await api.get("/dashboard/stats");
  return res.data;
}