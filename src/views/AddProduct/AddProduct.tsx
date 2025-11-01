import { useForm } from "@tanstack/react-form";
import useAddProduct from "./useAddProduct";
import useCategories from "./useCategories";
import z from "zod";

const coerceToNumberExceptEmptyString = z.preprocess(
  // Prevent coercing empty string to `0`.
  (arg) => (arg === "" ? undefined : arg),
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
  const categories = useCategories();
  const addProduct = useAddProduct();
  const form = useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      images: [""],
      categoryId: "",
    },
    onSubmit: async ({ value }) => {
      const data = productInputSchema.parse(value);
      await addProduct.mutateAsync(data);
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
        <div>AddProduct</div>
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
                {categories.data?.map(({ id, name }) => (
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

export default AddProduct;
