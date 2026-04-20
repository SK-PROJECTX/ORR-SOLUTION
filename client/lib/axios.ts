import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'https://orr-backend.orr.solutions'}`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const getCSRFToken = (): string | null => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "csrftoken") {
      return decodeURIComponent(value);
    }
  }
  return null;
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const url = config.url || "";
    const publicEndpoints = [
      "/api/auth/login/",
      "/client/register/",
      "/api/auth/forget-password/",
      "/api/auth/verify-reset-password/",
      "/api/auth/verify-email/",
    ];

    const isPublicEndpoint = publicEndpoints.some(endpoint => url.includes(endpoint));

    // Always check localStorage for accessToken
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add CSRF token for state-changing requests
    if (
      ["post", "put", "patch", "delete"].includes(
        config.method?.toLowerCase() || "",
      )
    ) {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || "";
      const errorData = error.response?.data;
      // Check if it's a token validation error or a general unauthorized error for private pages
      if (errorData?.data?.code === "token_not_valid" || !url.includes("/login")) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        
        // Only redirect if not already on an auth page
        if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
          const redirectUrl =
            window.location.hostname === "localhost"
              ? "/login/"
              : "http://orr.solutions/login/";
          window.location.href = redirectUrl;
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
