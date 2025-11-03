import { useMutation } from "@tanstack/react-query";
import fakeStoreApi from "../fakeStoreApi";

const useAddProduct = () => {
  return useMutation({
    mutationFn: (data: unknown) => {
      return fakeStoreApi.post("/products/", data);
    },
  });
};

export default useAddProduct;
