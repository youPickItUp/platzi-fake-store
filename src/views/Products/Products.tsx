import { useLocation, useSearchParams } from "wouter";
import { useCategories, useProducts } from "../../api";
import { objectEntries, objectFromEntries } from "tsafe";

const Products = () => {
  const [location, navigate] = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParams = {
    title: searchParams.get("title") ?? "",
    priceMin: searchParams.get("priceMin") ?? "",
    priceMax: searchParams.get("priceMax") ?? "",
    categoryId: searchParams.get("categoryId") ?? "",
  };

  const pageParam = Number(searchParams.get("page"));
  const page = Number.isFinite(pageParam) ? pageParam : 0;

  const productsQuery = useProducts(filterParams, page);
  const categoriesQuery = useCategories();

  const onPageChange = (nextPage: number) => {
    const nextSearchParamsWithFalsyValues = {
      ...filterParams,
      ...(nextPage === 0 ? {} : { page: nextPage.toString() }),
    };

    onSearchParamsChange(nextSearchParamsWithFalsyValues);
  };

  const onFilterChange = (name: keyof typeof filterParams, value: string) => {
    const nextSearchParamsWithFalsyValues = {
      ...filterParams,
      [name]: value,
      // Overwrite previous `page` value with a falsy `""` value to remove page from url effectively setting page `0`.
      page: "",
    };

    onSearchParamsChange(nextSearchParamsWithFalsyValues);
  };

  const onSearchParamsChange = (nextSearchParams: Record<string, string>) => {
    const nextFilterEntriesWithoutFalsyValues = objectEntries(
      nextSearchParams,
    ).filter(([, value]) => !!value);

    if (nextFilterEntriesWithoutFalsyValues.length === 0) {
      // Remove the otherwise persisting `?` from the url.
      navigate(location);
      return;
    }

    const nextSearchParamsWithoutFalsyValues = objectFromEntries(
      nextFilterEntriesWithoutFalsyValues,
    );

    setSearchParams(nextSearchParamsWithoutFalsyValues);
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
            value={filterParams.title ?? ""}
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
      <button disabled={page === 0} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>
      <button
        disabled={!productsQuery.data?.hasNextPage}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Products;
