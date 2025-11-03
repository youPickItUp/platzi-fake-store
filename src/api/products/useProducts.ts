import { useQuery } from "@tanstack/react-query";
import fakeStoreApi from "../fakeStoreApi";
import { productsSchema } from "../apiSchemas";
import { productsQueryKey } from "../../queryClient";
import z from "zod";
import { sortByToComparator } from "./utils";

const productsPageCount = 5;

const optionalStringSkipIfEmpty = z
  .string()
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

const useProducts = ({
  filterParams,
  page,
  sortBy,
}: {
  filterParams: z.input<typeof filterParamsSchema>;
  page: number;
  sortBy?: "title" | "price";
}) => {
  const isSortedClientSide = !!sortBy;
  const paginationParams = {
    offset: productsPageCount * page,
    limit: productsPageCount + 1, // Query one product more to derive `hasNextPage` from it.
  };
  const queryPaginationParams = isSortedClientSide
    ? undefined
    : paginationParams;

  return useQuery({
    queryKey: [
      productsQueryKey,
      "products",
      filterParams,
      queryPaginationParams,
    ],
    queryFn: async () => {
      const { data } = await fakeStoreApi.get("/products", {
        params: {
          ...filterParamsSchema.parse(filterParams),
          ...queryPaginationParams,
        },
      });

      return productsSchema.parse(data);
    },
    select: (data) => {
      if (isSortedClientSide) {
        const start = paginationParams.offset;
        const end = start + productsPageCount; // Not `limit`, because it's set to `count + 1`
        return {
          products: data.toSorted(sortByToComparator[sortBy]).slice(start, end),
          hasNextPage: data.length > end,
        };
      }

      const nthPageProductsAndOne = data;

      return {
        products: nthPageProductsAndOne.slice(0, productsPageCount),
        hasNextPage: nthPageProductsAndOne.length === productsPageCount + 1,
      };
    },
    placeholderData: (previousData) => previousData,
  });
};

export default useProducts;
