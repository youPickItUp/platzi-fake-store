import { Link, Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

const LazyLogin = lazy(() => import("./views/Login"));
const LazyProducts = lazy(() => import("./views/Products"));
const LazyProduct = lazy(() => import("./views/Product"));
const LazyAddProduct = lazy(() => import("./views/AddProduct"));
const LazyEditProduct = lazy(() => import("./views/EditProduct"));
const LazyNotFound = lazy(() => import("./views/NotFound"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar fluid rounded>
        <NavbarBrand as={Link} href="/">
          <img
            src="/favicon.ico"
            className="mr-3 h-6 sm:h-9"
            alt="Store logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Store
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink as={Link} href="/">
            Products
          </NavbarLink>
          <NavbarLink as={Link} href="/login">
            Login
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>

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
    </QueryClientProvider>
  );
}

export default App;
