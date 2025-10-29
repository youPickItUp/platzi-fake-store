import axios from "axios";

const productsApi = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
});

export default productsApi;
