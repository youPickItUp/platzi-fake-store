import { createRouter } from "@swan-io/chicane";

export const routerConfig = {
  Products: "/",
  AddProduct: "/products/new",
  Product: "/products/:id",
} as const;

const router = createRouter(routerConfig);

export default router;
