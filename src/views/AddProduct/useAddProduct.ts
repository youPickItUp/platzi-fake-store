import { useMutation } from "@tanstack/react-query";
import productsApi from "../../axios";

const useAddProduct = () => {
  return useMutation({
    mutationFn: async (data: unknown) => {
      await productsApi.post("/products/", data);
    },
  });
};

export default useAddProduct;
