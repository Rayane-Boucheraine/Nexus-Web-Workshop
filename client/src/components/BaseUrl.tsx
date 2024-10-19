import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const BaseUrl = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  validateStatus: (status) => status == 200 || status == 201,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

BaseUrl.interceptors.request.use(
  (request) => {
    const token = secureLocalStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseUrl.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      secureLocalStorage.removeItem("token");
      window.location.href = `/SignIn`;
    }
    return Promise.reject(error);
  }
);

export default BaseUrl;