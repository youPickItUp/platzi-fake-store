import "./App.css";
import router, { routesNames } from "./router";
import { match } from "ts-pattern";
import { lazy, Suspense } from "react";
import { Link } from "@swan-io/chicane";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";

const LazyLogin = lazy(() => import("./views/Login"));
const LazyProducts = lazy(() => import("./views/Products"));
const LazyProduct = lazy(() => import("./views/Product"));
const LazyAddProduct = lazy(() => import("./views/AddProduct"));
const LazyEditProduct = lazy(() => import("./views/EditProduct"));
const LazyNotFound = lazy(() => import("./views/NotFound"));

const tempId = "173";

function App() {
  const route = router.useRoute(routesNames);

  return (
    <QueryClientProvider client={queryClient}>
      {match(route)
        .with({ name: "login" }, () => (
          <Suspense>
            <LazyLogin />
          </Suspense>
        ))
        .with({ name: "products" }, () => (
          <Suspense>
            <LazyProducts />
          </Suspense>
        ))
        .with({ name: "addProduct" }, () => (
          <Suspense>
            <LazyAddProduct />
          </Suspense>
        ))
        .with({ name: "product" }, ({ params: { id } }) => (
          <Suspense>
            <LazyProduct id={id} />
          </Suspense>
        ))
        .with({ name: "editProduct" }, ({ params: { id } }) => (
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
      <Link to={router.login()}>Login</Link>
      <Link to={router.products()}>Products</Link>
      <Link to={router.product({ id: tempId })}>Product</Link>
      <Link to={router.editProduct({ id: tempId })}>Edit Product</Link>
      <Link to={router.addProduct()}>Add product</Link>
      <Link to="some random url/ala ma kota">Not found</Link>
    </QueryClientProvider>
  );
}

export default App;
