export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "applicant";
  image: string;
  resume: string;
  createdAt: string;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  image: string;
  resume: string;
}

export interface RegisterUserResponse {
  token: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: string;
  image: File;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  image?: File;
  resume?: File;
}

export interface UserResponse {
  users: User[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}
