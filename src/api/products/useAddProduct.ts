import { useMutation } from "@tanstack/react-query";
import fakeStoreApi from "../fakeStoreApi";

const useAddProduct = () => {
  return useMutation({
    mutationFn: async (data: unknown) => {
      await fakeStoreApi.post("/products/", data);
    },
  });
};

export default useAddProduct;
