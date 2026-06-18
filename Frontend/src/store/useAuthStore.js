// src/store/useAuthStore.js
import { create } from 'zustand';
import { authApi } from '../api/auth.api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  // ─── LOGIN ACTION ─────────────────────────────
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authApi.login({ email, password });
      
      // Save token to browser storage
      localStorage.setItem('token', data.data.token);
      
      // Update global state
      set({ 
        user: data.data.user, 
        token: data.data.token, 
        isAuthenticated: true,
        isLoading: false 
      });
      
      return data; 
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        isLoading: false 
      });
      throw error;
    }
  },

  // ─── LOGOUT ACTION ────────────────────────────
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  // ─── LOAD PROFILE (Runs on app refresh) ───────
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ isLoading: true });
    try {
      const data = await authApi.getProfile();
      set({ user: data.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      // If token is expired/invalid, clear it out
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  }
}));

export default useAuthStore;