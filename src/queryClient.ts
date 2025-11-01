import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const productsQueryKey = "PRODUCTS";
queryClient.setQueryDefaults([productsQueryKey], { staleTime: 10_000 });

export default queryClient;
