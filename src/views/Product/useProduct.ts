import { useQuery } from "@tanstack/react-query";
import fakeStoreApi from "../../fakeStoreApi";
import { productSchema } from "../../apiSchemas";

const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await fakeStoreApi.get(`/products/${id}`);
      return productSchema.parse(data);
    },
  });
};

export default useProduct;
