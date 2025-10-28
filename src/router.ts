import { createRouter } from "@swan-io/chicane";

const router = createRouter({
  Products: "/",
  AddProduct: "/products/new",
  Product: "/products/:id",
});

export default router;
