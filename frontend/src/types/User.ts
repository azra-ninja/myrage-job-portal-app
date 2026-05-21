export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "applicant";
  image: string;
  resume: string;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
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
}

export interface UpdateUserInput {
  name?: string;
  image?: File;
  resume?: File;
}
