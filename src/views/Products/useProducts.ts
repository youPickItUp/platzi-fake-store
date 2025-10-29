import { useQuery } from "@tanstack/react-query";
import productsApi from "../../axios";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await productsApi.get("/products");
      return data;
    },
  });
};

export default useProducts;
