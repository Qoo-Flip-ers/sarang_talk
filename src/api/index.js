import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

//요청
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//응답
api.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response.staues === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await api.post("/auth/refresh", { refreshToken });
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem("token", token);

          const newRequest =
            (error.config.headers.Authorization = `Bearer ${token}`);
          return api(newRequest);
        } else {
        }
      } catch (e) {
        console.error(e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
