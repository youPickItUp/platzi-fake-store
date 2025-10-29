import "./App.css";
import router, { routesNames } from "./router";
import { match } from "ts-pattern";
import { lazy, Suspense } from "react";
import { Link } from "@swan-io/chicane";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";

const LazyProducts = lazy(() => import("./views/Products"));
const LazyProduct = lazy(() => import("./views/Product"));
const LazyAddProduct = lazy(() => import("./views/AddProduct"));
const LazyNotFound = lazy(() => import("./views/NotFound"));

function App() {
  const route = router.useRoute(routesNames);

  return (
    <QueryClientProvider client={queryClient}>
      {match(route)
        .with({ name: "Products" }, () => (
          <Suspense>
            <LazyProducts />
          </Suspense>
        ))
        .with({ name: "Product" }, () => (
          <Suspense>
            <LazyProduct />
          </Suspense>
        ))
        .with({ name: "AddProduct" }, () => (
          <Suspense>
            <LazyAddProduct />
          </Suspense>
        ))
        .otherwise(() => (
          <Suspense>
            <LazyNotFound />
          </Suspense>
        ))}
      <Link to={router.Products()}>Products</Link>
      <Link to={router.Product({ id: "123" })}>Product</Link>
      <Link to={router.AddProduct()}>Add product</Link>
      <Link to="some random url/ala ma kota">Not found</Link>
    </QueryClientProvider>
  );
}

export default App;
