import axios from "axios";

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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
