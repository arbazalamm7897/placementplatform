import axios from "axios";

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const clearStoredAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getValidStoredToken = () => {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined" || token === "null") {
    return null;
  }

  const tokenParts = token.split(".");

  if (tokenParts.length !== 3) {
    clearStoredAuth();
    return null;
  }

  try {
    const payload = JSON.parse(atob(tokenParts[1]));

    if (payload?.exp && payload.exp * 1000 <= Date.now()) {
      clearStoredAuth();
      return null;
    }
  } catch (error) {
    clearStoredAuth();
    return null;
  }

  return token;
};

export const getApiErrorMessage = (
  error,
  fallback = "Something went wrong"
) => {
  const responseData = error?.response?.data;

  return (
    responseData?.error ||
    responseData?.details ||
    responseData?.message ||
    error?.message ||
    fallback
  );
};

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = getValidStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const code = error?.response?.data?.code;

    if (
      status === 401 &&
      (code === "INVALID_TOKEN" || code === "AUTH_REQUIRED")
    ) {
      clearStoredAuth();

      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

export const analyzeResume = (formData) =>
  API.post("/resume/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const startInterview = (formData) =>
  API.post("/interview/start", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getInterviewQuestion = (id) => API.get(`/interview/question/${id}`);
export const submitInterviewAnswer = (id, data) =>
  API.post(`/interview/answer/${id}`, data);
export const getInterviewFeedback = (id) => API.get(`/interview/feedback/${id}`);

export const runDsaCode = (problemId, payload) =>
  API.post(`/coding/dsa/${problemId}/run`, payload);

export const fetchProgress = () => API.get("/progress");
export const trackProgress = (payload) => API.post("/progress/track", payload);
export const clearProgress = () => API.delete("/progress");

export default API;
