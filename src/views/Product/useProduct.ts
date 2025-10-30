import { useQuery } from "@tanstack/react-query";
import productsApi from "../../axios";
import { productSchema } from "../../apiSchemas";

const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await productsApi.get(`/products/${id}`);
      return productSchema.parse(data);
    },
  });
};

export default useProduct;
