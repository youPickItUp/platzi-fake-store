import { useCategories, useProducts } from "../../api";
import { useState } from "react";

const Products = () => {
  const [filterParams, setFilterParams] = useState({
    title: "",
    priceMin: "",
    priceMax: "",
    categoryId: "",
  });
  const [page, setPage] = useState(0);
  const productsQuery = useProducts(filterParams, page);
  const categoriesQuery = useCategories();

  const onFilterChange = (name: keyof typeof filterParams, value: string) => {
    setFilterParams((prev) => ({ ...prev, [name]: value }));
    setPage(0);
  };

  return (
    <div>
      Products
      <div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={filterParams.title}
            onChange={(e) => onFilterChange("title", e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="priceMin">Price min</label>
          <input
            id="priceMin"
            name="priceMin"
            value={filterParams.priceMin}
            onChange={(e) => onFilterChange("priceMin", e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="priceMax">Price max</label>
          <input
            id="priceMax"
            name="priceMax"
            value={filterParams.priceMax}
            onChange={(e) => onFilterChange("priceMax", e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="categoryId">Choose a category:</label>

          <select
            name="categoryId"
            id="categoryId"
            value={filterParams.categoryId}
            onChange={(e) => onFilterChange("categoryId", e.target.value)}
          >
            <option value=""></option>
            {categoriesQuery.data?.map(({ id, name }) => (
              <option value={id}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      {productsQuery.data?.products.map(({ id, title }) => (
        <p key={id}>{title}</p>
      ))}
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <button
        disabled={!productsQuery.data?.hasNextPage}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Products;
