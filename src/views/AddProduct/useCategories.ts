import { useQuery } from "@tanstack/react-query";
import productsApi from "../../axios";
import { categoriesSchema } from "../../apiSchemas";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await productsApi.get(`/categories`);
      return categoriesSchema.parse(data);
    },
  });
};

export default useCategories;
