import { z } from "zod";

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  image: z.url(),
});

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  price: z.number(),
  description: z.string(),
  category: categorySchema,
  images: z.array(z.url()),
});

export const productsSchema = z.array(productSchema);
