import axiosClient from './axiosClient';
import { User } from './authApi';

export const userApi = {

  // -------------------------------------------------
  // ADMIN: Get All Users
  // -------------------------------------------------
  getAllUsers: async (): Promise<User[]> => {
    const response = await axiosClient.get('/users');
    return response.data;
  },

  // -------------------------------------------------
  // ADMIN: Get Pending Users
  // -------------------------------------------------
  getPendingUsers: async (): Promise<User[]> => {
    const response = await axiosClient.get('/users/pending');
    return response.data;
  },

  // -------------------------------------------------
  // ADMIN: Approve a user
  // -------------------------------------------------
  approveUser: async (id: string): Promise<{ message: string; user: User }> => {
    const response = await axiosClient.post(`/users/${id}/approve`);
    return response.data;
  },

  // -------------------------------------------------
  // ADMIN: Update Role
  // -------------------------------------------------
  updateUserRole: async (id: string, role: string): Promise<{ message: string; user: User }> => {
    const response = await axiosClient.patch(`/users/${id}/role`, { role });
    return response.data;
  },

  // -------------------------------------------------
  // ADMIN: Delete user
  // -------------------------------------------------
  deleteUser: async (id: string): Promise<void> => {
    await axiosClient.delete(`/users/${id}`);
  },

  // -------------------------------------------------
  // ADMIN: Dashboard Stats
  // -------------------------------------------------
  getAdminStats: async (): Promise<{
    totalUsers: number;
    pendingApprovals: number;
    totalAssignments: number;
    totalSubmissions: number;
    lockedUsers: number;            // NEW
    unverifiedEmails: number;       // NEW
  }> => {
    const response = await axiosClient.get('/users/admin/stats/overview');
    return response.data;
  },

  // -------------------------------------------------
  // USER: Profile Settings — Update name
  // -------------------------------------------------
  updateName: async (name: string): Promise<{ message: string; user: User }> => {
    const response = await axiosClient.patch('/users/update-name', { name });
    return response.data;
  },

  // -------------------------------------------------
  // USER: Change Password
  // -------------------------------------------------
  changePassword: async (
    oldPassword: string,
    newPassword: string
  ): Promise<{ message: string }> => {
    const response = await axiosClient.post('/users/change-password', {
      oldPassword,
      newPassword,
    });
    return response.data;
  },

  // -------------------------------------------------
  // USER: Delete own account permanently
  // -------------------------------------------------
  deleteOwnAccount: async (): Promise<{ message: string }> => {
    const response = await axiosClient.delete('/users/delete-account');
    return response.data;
  },

  // -------------------------------------------------
  // USER: Get verification status
  // -------------------------------------------------
  getUserVerificationStatus: async (
    id: string
  ): Promise<{
    emailVerified: boolean;
    approved: boolean;
    requiresOTP: boolean;
    isLocked: boolean;
  }> => {
    const response = await axiosClient.get(`/users/${id}/verification-status`);
    return response.data;
  },

  // -------------------------------------------------
  // USER: Resend Email Verification
  // -------------------------------------------------
  resendVerificationEmail: async (
    email: string
  ): Promise<{ message: string }> => {
    const response = await axiosClient.post('/users/resend-verification', { email });
    return response.data;
  },

  // -------------------------------------------------
  // USER: First-time login OTP request
  // -------------------------------------------------
  requestOTPForLogin: async (
    email: string
  ): Promise<{ message: string }> => {
    const response = await axiosClient.post('/auth/request-otp', { email });
    return response.data;
  },

  // -------------------------------------------------
  // USER: Verify OTP for login
  // -------------------------------------------------
  verifyOTP: async (
    email: string,
    otp: string
  ): Promise<{ message: string; token: string; user: User }> => {
    const response = await axiosClient.post('/auth/verify-otp', { email, otp });
    return response.data;
  },

  // -------------------------------------------------
  // ADMIN: Unlock locked users
  // -------------------------------------------------
  unlockUser: async (
    id: string
  ): Promise<{ message: string; user: User }> => {
    const response = await axiosClient.post(`/users/${id}/unlock`);
    return response.data;
  },
};
