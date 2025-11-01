import { useQuery } from "@tanstack/react-query";
import fakeStoreApi from "../../fakeStoreApi";
import { productsSchema } from "../../apiSchemas";
import { productsQueryKey } from "../../queryClient";

const useProducts = () => {
  return useQuery({
    queryKey: [productsQueryKey, "products"],
    queryFn: async () => {
      const { data } = await fakeStoreApi.get("/products");
      return productsSchema.parse(data);
    },
  });
};

export default useProducts;
