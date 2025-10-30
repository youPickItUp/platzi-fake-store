import { useMutation } from "@tanstack/react-query";
import productsApi from "../../axios";

const useEditProduct = (id: string) => {
  return useMutation({
    mutationFn: async (data: unknown) => {
      await productsApi.put(`/products/${id}`, data);
    },
  });
};

export default useEditProduct;
