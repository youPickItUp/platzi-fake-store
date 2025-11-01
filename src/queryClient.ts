import { QueryCache, QueryClient } from "@tanstack/react-query";

const queryCache = new QueryCache({
  onError: (error, query) => {
    console.error(error);
    console.log(query);
  },
});
const queryClient = new QueryClient({ queryCache });

export const productsQueryKey = "PRODUCTS";
queryClient.setQueryDefaults([productsQueryKey], { staleTime: 10_000 });

export default queryClient;
