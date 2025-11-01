import { useQuery } from "@tanstack/react-query";
import fakeStoreApi from "../fakeStoreApi";
import { productsSchema } from "../apiSchemas";
import { productsQueryKey } from "../../queryClient";
import z from "zod";

const optionalStringSkipIfEmpty = z
  .string()
  .optional()
  .transform((val) => (val === "" ? undefined : val));

const filterParamsSchema = z
  .object({
    title: optionalStringSkipIfEmpty,
    priceMin: optionalStringSkipIfEmpty,
    priceMax: optionalStringSkipIfEmpty,
    categoryId: optionalStringSkipIfEmpty,
  })
  .transform(({ priceMin, priceMax, ...rest }) => ({
    ...rest,
    price_min: priceMin,
    price_max: priceMax,
  }));

const useProducts = (
  filterParams:
    | {
        title?: string;
        priceMin?: string;
        priceMax?: string;
        categoryId?: string;
      }
    | undefined,
) => {
  return useQuery({
    queryKey: [productsQueryKey, "products", filterParams],
    queryFn: async () => {
      const { data } = await fakeStoreApi.get("/products", {
        params: filterParamsSchema.parse(filterParams),
      });
      return productsSchema.parse(data);
    },
  });
};

export default useProducts;
