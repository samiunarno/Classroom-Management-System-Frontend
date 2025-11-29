import axiosClient from './axiosClient';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'monitor' | 'student';
  approved: boolean;
  emailVerified?: boolean; // NEW
  isLocked?: boolean;      // NEW
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'student' | 'monitor';
}

export interface AuthResponse {
  token?: string;
  user: User;
  requiresEmailVerification: boolean;
  requiresApproval: boolean;
  requiresOTP: boolean;
  message?: string;
}

export const authApi = {
  // ---------------------------
  // REGISTER
  // ---------------------------
  register: async (data: RegisterData): Promise<{ message: string; user: User }> => {
    const response = await axiosClient.post('/auth/register', data);
    return response.data; 
  },

  // ---------------------------
  // LOGIN (Checks: emailVerified, approved, OTP)
  // ---------------------------
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosClient.post('/auth/login', credentials);
    return response.data;
  },

  // ---------------------------
  // VERIFY OTP (first-time login)
  // ---------------------------
  verifyOTP: async (email: string, otp: string): Promise<AuthResponse> => {
    const response = await axiosClient.post('/auth/verify-otp', { email, otp });
    return response.data;
  },

  // ---------------------------
  // RESEND OTP
  // ---------------------------
  resendOTP: async (email: string): Promise<{ message: string }> => {
    const response = await axiosClient.post('/auth/resend-otp', { email });
    return response.data;
  },

  // ---------------------------
  // Email Confirmation after Signup
  // ---------------------------
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await axiosClient.get(`/auth/verify-email/${token}`);
    return response.data;
  },

  // ---------------------------
  // Load logged-in user
  // ---------------------------
  getMe: async (): Promise<{ user: User }> => {
    const response = await axiosClient.get('/auth/me');
    return response.data;
  },
};
