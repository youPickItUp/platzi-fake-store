import "./App.css";
import { Link, Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";

const LazyLogin = lazy(() => import("./views/Login"));
const LazyProducts = lazy(() => import("./views/Products"));
const LazyProduct = lazy(() => import("./views/Product"));
const LazyAddProduct = lazy(() => import("./views/AddProduct"));
const LazyEditProduct = lazy(() => import("./views/EditProduct"));
const LazyNotFound = lazy(() => import("./views/NotFound"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/login">
          <Suspense>
            <LazyLogin />
          </Suspense>
        </Route>
        <Route path="/">
          <Suspense>
            <LazyProducts />
          </Suspense>
        </Route>
        <Route path="/products/new">
          <Suspense>
            <LazyAddProduct />
          </Suspense>
        </Route>
        <Route path={/^[/]products[/](?<id>[0-9]+)$/}>
          {(params) => (
            <Suspense>
              <LazyProduct id={params.id!} />
            </Suspense>
          )}
        </Route>
        <Route path={/^[/]products[/](?<id>[0-9]+)[/]edit$/}>
          {(params) => (
            <Suspense>
              <LazyEditProduct id={params.id!} />
            </Suspense>
          )}
        </Route>
        <Route>
          <Suspense>
            <LazyNotFound />
          </Suspense>
        </Route>
      </Switch>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/login">Login</Link>
        <Link to="/">Products</Link>
        <Link to="/products/122">Product</Link>
        <Link to="/products/122/edit">Edit Product</Link>
        <Link to="/products/new">Add product</Link>
        <Link to="/some random url/ala ma kota">Not found</Link>
      </div>
    </QueryClientProvider>
  );
}

export default App;
