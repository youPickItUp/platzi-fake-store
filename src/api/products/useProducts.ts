import { useQuery } from "@tanstack/react-query";
import fakeStoreApi from "../fakeStoreApi";
import { productsSchema } from "../apiSchemas";
import { productsQueryKey } from "../../queryClient";
import z from "zod";

const productsPageCount = 5;

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
  }))
  .optional();

const useProducts = (
  filterParams:
    | {
        title?: string;
        priceMin?: string;
        priceMax?: string;
        categoryId?: string;
      }
    | undefined,
  page: number | undefined,
) => {
  return useQuery({
    queryKey: [productsQueryKey, "products", filterParams, page],
    queryFn: async () => {
      const { data } = await fakeStoreApi.get("/products", {
        params: {
          ...filterParamsSchema.parse(filterParams),
          ...(page === undefined
            ? {}
            : {
                offset: productsPageCount * page,
                limit: productsPageCount + 1,
              }),
        },
      });

      const nthPageProductsAndOne = productsSchema.parse(data);

      return {
        products: nthPageProductsAndOne.slice(0, productsPageCount),
        hasNextPage: nthPageProductsAndOne.length === productsPageCount + 1,
      };
    },
  });
};

export default useProducts;
