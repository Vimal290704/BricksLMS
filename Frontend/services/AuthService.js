import * as SecureStore from "expo-secure-store";
import axios from "axios";
import jwtDecode from "jwt-decode";


const API_URL = "http://10.0.2.2:8000/api"; // For Android Emulator
// const API_URL = "http://localhost:8000/api"; // For iOS Simulator
// const API_URL = "http://192.168.X.X:8000/api"; // For real device (replace with actual local IP)

// Create an Axios instance for API calls
const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor: Automatically refresh token if request is unauthorized (401)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized! Trying to refresh token...");
      try {
        await AuthService.refreshToken();
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError.message);
        await AuthService.logout();
      }
    }
    return Promise.reject(error);
  }
);

export const AuthService = {
  // Login Method
  async login(email, password) {
    try {
      const response = await apiClient.post(`/token/`, { email, password });

      if (!response.data?.access || !response.data?.refresh) {
        throw new Error("Invalid login response. Missing access or refresh token.");
      }

      console.log("Login successful:", response.data);

      const { refresh, access } = response.data;
      const decodedUser = jwtDecode(access);

      // Store tokens securely
      await SecureStore.setItemAsync("accessToken", access);
      await SecureStore.setItemAsync("refreshToken", refresh);
      await SecureStore.setItemAsync("user", JSON.stringify(decodedUser));

      return { tokens: response.data, user: decodedUser };
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  },

  // Get current user details
  async getCurrentUser() {
    try {
      const userString = await SecureStore.getItemAsync("user");
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error("Get user error:", error.response?.data || error.message);
      return null;
    }
  },

  // Refresh token method
  async refreshToken() {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    if (!refreshToken) {
      console.error("No refresh token found. User needs to log in.");
      throw new Error("No refresh token available");
    }

    try {
      const response = await apiClient.post(`/token/refresh/`, { refresh: refreshToken });

      if (!response.data?.access) {
        throw new Error("Invalid refresh response. Missing new access token.");
      }

      const { access } = response.data;
      const decodedUser = jwtDecode(access);

      // Update stored tokens
      await SecureStore.setItemAsync("accessToken", access);
      await SecureStore.setItemAsync("user", JSON.stringify(decodedUser));

      console.log("Token refreshed successfully!");

      return { access, user: decodedUser };
    } catch (error) {
      console.error("Refresh token error:", error?.response?.data || error.message);

      if (error.response?.status === 401) {
        console.warn("Refresh token expired. Logging out...");
        await AuthService.logout();
      }

      throw error;
    }
  },

  // Logout Method
  async logout() {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("user");
    console.log("User logged out.");
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const token = await SecureStore.getItemAsync("accessToken");
    return !!token;
  },
};
