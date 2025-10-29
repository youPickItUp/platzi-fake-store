import { z } from "zod";

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  image: z.url(),
});

const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  price: z.number(),
  description: z.string(),
  category: categorySchema,
  images: z.array(z.url()),
});

const productsSchema = z.array(productSchema);

export default productsSchema;
