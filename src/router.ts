import { createRouter } from "@swan-io/chicane";
import { objectKeys } from "tsafe";

const routerConfig = {
  products: "/",
  login: "/login",
  addProduct: "/products/new",
  product: "/products/:id",
  editProduct: "/products/:id/edit",
} as const;

export const routesNames = objectKeys(routerConfig);

const router = createRouter(routerConfig);

export default router;
