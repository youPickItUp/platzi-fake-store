import { createRouter } from "@swan-io/chicane";
import { objectKeys } from "tsafe";

const routerConfig = {
  Products: "/",
  AddProduct: "/products/new",
  Product: "/products/:id",
  EditProduct: "/products/:id/edit",
} as const;

export const routesNames = objectKeys(routerConfig);

const router = createRouter(routerConfig);

export default router;
