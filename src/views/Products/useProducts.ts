import { useQuery } from "@tanstack/react-query";
import productsApi from "../../axios";
import productsSchema from "./productsSchema";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await productsApi.get("/products");
      return productsSchema.parse(data);
    },
  });
};

export default useProducts;
