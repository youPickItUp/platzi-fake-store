import { useForm } from "@tanstack/react-form";
import { useEditProduct, useProduct, useCategories } from "../../api";
import { objectEntries, objectFromEntries } from "tsafe";
import z from "zod";
import { Button, Card, Label, Select, TextInput } from "flowbite-react";

const coerceToNumberExceptEmptyString = z.preprocess(
  // Prevent coercing empty string to `0`.
  (arg) => (arg === "" ? undefined : arg),
  z.coerce.number(),
);

const productInputSchema = z.object({
  title: z.string().nonempty().optional(),
  price: coerceToNumberExceptEmptyString.optional(),
  description: z.string().nonempty().optional(),
  images: z.array(z.url()).nonempty().optional(),
  categoryId: coerceToNumberExceptEmptyString.optional(),
});

const EditProduct = ({ id }: { id: string }) => {
  const categoriesQuery = useCategories();
  const editProductMutation = useEditProduct(id);
  const productQuery = useProduct(id);

  const form = useForm({
    defaultValues: {
      title: productQuery.data?.title ?? "",
      price: productQuery.data?.price?.toString() ?? "",
      description: productQuery.data?.description ?? "",
      images: productQuery.data?.images ?? [],
      categoryId: productQuery.data?.category.id.toString() ?? "",
    },
    onSubmit: async ({ value, formApi }) => {
      const fieldMeta = formApi.state.fieldMeta;
      const nonDefaultValues = objectFromEntries(
        objectEntries(value).filter(([key]) => !fieldMeta[key].isDefaultValue),
      );
      const data = productInputSchema.parse(nonDefaultValues);
      await editProductMutation.mutateAsync(data);
    },
  });

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <Card className="w-full max-w-2xl shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Product
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Title */}
          <form.Field name="title">
            {(field) => (
              <div>
                <Label htmlFor={field.name} />
                <TextInput
                  id={field.name}
                  placeholder="Product title"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                />
              </div>
            )}
          </form.Field>

          {/* Price */}
          <form.Field name="price">
            {(field) => (
              <div>
                <Label htmlFor={field.name} />
                <TextInput
                  id={field.name}
                  type="number"
                  placeholder="0.00"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                />
              </div>
            )}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <div>
                <Label htmlFor={field.name} />
                <TextInput
                  id={field.name}
                  placeholder="Short product description"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          {/* Images */}
          <form.Field name="images" mode="array">
            {(field) => (
              <div>
                <Label htmlFor={field.name} />
                <div className="space-y-3">
                  {field.state.value.map((_, i) => (
                    <form.Field key={i} name={`images[${i}]`}>
                      {(subfield) => (
                        <div className="flex gap-2 items-center">
                          <TextInput
                            id={subfield.name}
                            placeholder="Image URL"
                            value={subfield.state.value}
                            onBlur={subfield.handleBlur}
                            onChange={(e) =>
                              subfield.handleChange(e.target.value)
                            }
                            className="flex-grow"
                          />
                        </div>
                      )}
                    </form.Field>
                  ))}
                  <Button
                    color="light"
                    type="button"
                    onClick={() => field.pushValue("")}
                  >
                    + Add Image
                  </Button>
                </div>
              </div>
            )}
          </form.Field>

          {/* Category */}
          <form.Field name="categoryId">
            {(field) => (
              <div>
                <Label htmlFor={field.name} />
                <Select
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option value="">Select category</option>
                  {categoriesQuery.data?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </div>
            )}
          </form.Field>

          {/* Submit */}
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit">
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </Card>
    </div>
  );
};

export default EditProduct;
