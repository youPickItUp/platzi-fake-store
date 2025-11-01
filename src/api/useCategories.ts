import { useQuery } from "@tanstack/react-query";
import fakeStoreApi from "./fakeStoreApi";
import { categoriesSchema } from "./apiSchemas";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await fakeStoreApi.get(`/categories`);
      return categoriesSchema.parse(data);
    },
  });
};

export default useCategories;
