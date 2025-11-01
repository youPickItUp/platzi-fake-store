import { useForm } from "@tanstack/react-form";
import { useEditProduct, useProduct, useCategories } from "../../api";
import { objectEntries, objectFromEntries } from "tsafe";
import z from "zod";

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        <div>Edit Product</div>
        <form.Field name="title">
          {(field) => (
            <>
              <label htmlFor={field.name}>Title</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              ></input>
            </>
          )}
        </form.Field>
        <form.Field name="price">
          {(field) => (
            <>
              <label htmlFor={field.name}>Price</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              ></input>
            </>
          )}
        </form.Field>
        <form.Field name="description">
          {(field) => (
            <>
              <label htmlFor={field.name}>Description</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              ></input>
            </>
          )}
        </form.Field>
        <form.Field name="images" mode="array">
          {(field) => (
            <div>
              {field.state.value.map((_, i) => (
                <form.Field key={i} name={`images[${i}]`}>
                  {(subfield) => (
                    <>
                      <label htmlFor={subfield.name}>Image</label>
                      <input
                        id={subfield.name}
                        name={subfield.name}
                        value={subfield.state.value}
                        onBlur={subfield.handleBlur}
                        onChange={(e) => subfield.handleChange(e.target.value)}
                      ></input>
                    </>
                  )}
                </form.Field>
              ))}
              <button type="button" onClick={() => field.pushValue("")}>
                Add image
              </button>
            </div>
          )}
        </form.Field>
        <form.Field name="categoryId">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Choose a category:</label>

              <select
                name={field.name}
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option value=""></option>
                {categoriesQuery.data?.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
              </select>
            </div>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <button type="submit">{isSubmitting ? "loading" : "submit"}</button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};

export default EditProduct;
