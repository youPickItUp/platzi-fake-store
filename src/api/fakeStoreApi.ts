import axios from "axios";

const fakeStoreApi = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
});

export default fakeStoreApi;
