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
const LazyEditProduct = lazy(() => import("./views/EditProduct"));
const LazyNotFound = lazy(() => import("./views/NotFound"));
const tempId = "105";
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
        .with({ name: "AddProduct" }, () => (
          <Suspense>
            <LazyAddProduct />
          </Suspense>
        ))
        .with({ name: "Product" }, ({ params: { id } }) => (
          <Suspense>
            <LazyProduct id={id} />
          </Suspense>
        ))
        .with({ name: "EditProduct" }, ({ params: { id } }) => (
          <Suspense>
            <LazyEditProduct id={id} />
          </Suspense>
        ))
        .with(undefined, () => (
          <Suspense>
            <LazyNotFound />
          </Suspense>
        ))
        .exhaustive()}
      <Link to={router.Products()}>Products</Link>
      <Link to={router.Product({ id: tempId })}>Product</Link>
      <Link to={router.EditProduct({ id: tempId })}>Edit Product</Link>
      <Link to={router.AddProduct()}>Add product</Link>
      <Link to="some random url/ala ma kota">Not found</Link>
    </QueryClientProvider>
  );
}

export default App;
