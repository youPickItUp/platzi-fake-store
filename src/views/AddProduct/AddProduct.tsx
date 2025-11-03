import { useForm } from "@tanstack/react-form";
import { useAddProduct, useCategories } from "../../api";
import z from "zod";
import { Badge, Button, Card, Label, Select, TextInput } from "flowbite-react";
import { useLocation } from "wouter";

const coerceToNumberExceptEmptyString = z.preprocess(
  // Prevent coercing empty string to `0`.
  (arg: string) => (arg === "" ? undefined : arg),
  z.coerce.number(),
);

const productInputSchema = z.object({
  title: z.string().nonempty(),
  price: coerceToNumberExceptEmptyString,
  description: z.string().nonempty(),
  images: z.array(z.url()).nonempty(),
  categoryId: coerceToNumberExceptEmptyString,
});

const AddProduct = () => {
  const [, navigate] = useLocation();
  const categoriesQuery = useCategories();
  const addProductMutation = useAddProduct();
  const form = useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      images: [""],
      categoryId: "",
    },
    validators: {
      onChange: productInputSchema,
    },
    onSubmit: async ({ value }) => {
      const data = productInputSchema.parse(value);
      const {
        data: { id },
      } = await addProductMutation.mutateAsync(data);
      navigate(`/products/${id}`);
    },
  });

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <Card className="w-full max-w-2xl! shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Add Product
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
                <Label htmlFor={field.name}>Title</Label>
                <TextInput
                  id={field.name}
                  placeholder="Product title"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                />
                {!field.state.meta.isValid &&
                  !field.state.meta.isDefaultValue && (
                    <Badge color="red">
                      {field.state.meta.errors
                        .map((err) => err?.message)
                        .filter(Boolean)
                        .join(", ")}
                    </Badge>
                  )}
              </div>
            )}
          </form.Field>

          {/* Price */}
          <form.Field name="price">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Price</Label>
                <TextInput
                  id={field.name}
                  type="number"
                  placeholder="0.00"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                />
                {!field.state.meta.isValid &&
                  !field.state.meta.isDefaultValue && (
                    <Badge color="red">
                      {field.state.meta.errors
                        .map((err) => err?.message)
                        .filter(Boolean)
                        .join(", ")}
                    </Badge>
                  )}
              </div>
            )}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Description</Label>
                <TextInput
                  id={field.name}
                  placeholder="Short product description"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                />
                {!field.state.meta.isValid &&
                  !field.state.meta.isDefaultValue && (
                    <Badge color="red">
                      {field.state.meta.errors
                        .map((err) => err?.message)
                        .filter(Boolean)
                        .join(", ")}
                    </Badge>
                  )}
              </div>
            )}
          </form.Field>

          {/* Images */}
          <form.Field name="images" mode="array">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Images urls:</Label>
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
                            required
                          />
                          {!subfield.state.meta.isValid &&
                            !subfield.state.meta.isDefaultValue && (
                              <Badge color="red">
                                {console.log(subfield.state.meta.errors) ??
                                  subfield.state.meta.errors
                                    .map((err) => err?.message)
                                    .filter(Boolean)
                                    .join(", ")}
                              </Badge>
                            )}
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
                <Label htmlFor={field.name}>Category</Label>
                <Select
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {categoriesQuery.data?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
                {!field.state.meta.isValid &&
                  !field.state.meta.isDefaultValue && (
                    <Badge color="red">
                      {field.state.meta.errors
                        .map((err) => err?.message)
                        .filter(Boolean)
                        .join(", ")}
                    </Badge>
                  )}
              </div>
            )}
          </form.Field>

          {/* Submit */}
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
