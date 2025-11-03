import axios from "axios";

export const accessTokenKey = "accessTokenKey";
const fakeStoreApi = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
});

fakeStoreApi.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      `Bearer ${localStorage.getItem(accessTokenKey)}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
export default fakeStoreApi;
