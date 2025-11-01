import { useForm } from "@tanstack/react-form";
import { useCategories, useProducts } from "../../api";
import { useState } from "react";

const Products = () => {
  const [filterParams, setFilterParams] = useState<{
    title: string;
    priceMin: string;
    priceMax: string;
    categoryId: string;
  }>();
  const productsQuery = useProducts(filterParams);
  const categoriesQuery = useCategories();

  const form = useForm({
    defaultValues: {
      title: "",
      priceMin: "",
      priceMax: "",
      categoryId: "",
    },
    onSubmit: async ({ value }) => {
      setFilterParams(value);
    },
  });

  return (
    <div>
      Products
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
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
            <form.Field name="priceMin">
              {(field) => (
                <>
                  <label htmlFor={field.name}>Price min</label>
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
            <form.Field name="priceMax">
              {(field) => (
                <>
                  <label htmlFor={field.name}>Price max</label>
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
                <button type="submit">
                  {isSubmitting ? "loading" : "submit"}
                </button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
      {productsQuery.data?.map(({ id, title }) => (
        <p key={id}>{title}</p>
      ))}
    </div>
  );
};

export default Products;
