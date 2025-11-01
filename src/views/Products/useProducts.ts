import { useQuery } from "@tanstack/react-query";
import fakeStoreApi from "../../fakeStoreApi";
import { productsSchema } from "../../apiSchemas";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await fakeStoreApi.get("/products");
      return productsSchema.parse(data);
    },
  });
};

export default useProducts;
