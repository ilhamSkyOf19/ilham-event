import environment from "@/configs/environment";
import axios from "axios";

// header
const headers = {
  "Content-Type": "application/json",
};

// instance
const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
  withCredentials: true,
});

// interceptors request
instance.interceptors.request.use(
  async (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// interceptors response
instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// export
export default instance;
