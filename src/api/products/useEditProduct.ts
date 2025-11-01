import { useMutation } from "@tanstack/react-query";
import fakeStoreApi from "../fakeStoreApi";

const useEditProduct = (id: string) => {
  return useMutation({
    mutationFn: async (data: unknown) => {
      await fakeStoreApi.put(`/products/${id}`, data);
    },
  });
};

export default useEditProduct;
