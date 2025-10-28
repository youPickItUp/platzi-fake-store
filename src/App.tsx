import "./App.css";
import router from "./router";
import { match } from "ts-pattern";
import { lazy, Suspense } from "react";
import { Link } from "@swan-io/chicane";

const LazyProducts = lazy(() => import("./routes/Products"));
const LazyProduct = lazy(() => import("./routes/Product"));
const LazyAddProduct = lazy(() => import("./routes/AddProduct"));
const LazyNotFound = lazy(() => import("./routes/NotFound"));

function App() {
  const route = router.useRoute(["Products", "Product", "AddProduct"]);

  return (
    <>
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
    </>
  );
}

export default App;
