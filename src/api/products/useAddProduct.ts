import { useMutation } from "@tanstack/react-query";
import fakeStoreApi from "../fakeStoreApi";
import queryClient, { productsQueryKey } from "../../queryClient";
import Notify from "simple-notify";

const useAddProduct = () => {
  return useMutation({
    mutationFn: (data: unknown) => {
      return fakeStoreApi.post("/products/", data);
    },
    onSuccess: () => {
      new Notify({
        status: "success",
        title: "Product created!",
        autotimeout: 5000,
      });
      return queryClient.invalidateQueries({ queryKey: [productsQueryKey] });
    },
    onError: () => {
      new Notify({
        status: "error",
        title: "Product creation failed!",
        autotimeout: 5000,
      });
    },
  });
};

export default useAddProduct;
