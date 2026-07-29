import api from "./axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  age: number;
  weight: number;
  height: number;
  fitnessGoal: string;
  activityLevel: string;
}

export const login = (data: LoginRequest) =>
  api.post("/auth/login", data);

export const register = (data: RegisterRequest) =>
  api.post("/auth/register", data);