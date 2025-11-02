import { useMutation } from "@tanstack/react-query";
import fakeStoreApi from "../fakeStoreApi";
import queryClient, { productsQueryKey } from "../../queryClient";

const useDeleteProduct = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return fakeStoreApi.delete(`/products/${id}`);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [productsQueryKey] }),
  });
};

export default useDeleteProduct;
