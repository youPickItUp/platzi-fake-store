import { useLocation, useSearchParams } from "wouter";
import { useCategories, useProducts } from "../../api";
import { objectEntries, objectFromEntries } from "tsafe";
import { useEffect, useRef, useState } from "react";

const Products = () => {
  const [location, navigate] = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterParams = {
    title: searchParams.get("title") ?? "",
    priceMin: searchParams.get("priceMin") ?? "",
    priceMax: searchParams.get("priceMax") ?? "",
    categoryId: searchParams.get("categoryId") ?? "",
  };

  const sortByParam = searchParams.get("sortBy");
  const sortBy =
    sortByParam === "title" || sortByParam === "price" ? sortByParam : "";

  const pageParamNumber = Number(searchParams.get("page"));
  const page = Number.isFinite(pageParamNumber) ? pageParamNumber : 0;

  const productsQuery = useProducts({
    filterParams,
    page,
    sortBy: sortBy ? sortBy : undefined,
  });

  const categoriesQuery = useCategories();

  const onSearchChange = (
    updatedParams: Partial<
      Record<"page" | "sortBy" | keyof typeof filterParams, string>
    >,
  ) => {
    const nextSearchParamsWithFalsyValues = {
      ...filterParams,
      sortBy,
      // Overwrite previous `page` value with a falsy `""` value to remove page from url effectively setting page `0`.
      page: "",
      ...updatedParams,
    };

    const nextFilterEntriesWithoutFalsyValues = objectEntries(
      nextSearchParamsWithFalsyValues,
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
      <button onClick={() => navigate("/products/new")}>Add +</button>
      <div>
        <div>
          <label htmlFor="title">Title</label>
          <Title
            initialValue={filterParams.title}
            onChange={(nextValue) => onSearchChange({ title: nextValue })}
          />
        </div>
        <div>
          <label htmlFor="priceMin">Price min</label>
          <input
            id="priceMin"
            name="priceMin"
            value={filterParams.priceMin}
            onChange={(e) => onSearchChange({ priceMin: e.target.value })}
          ></input>
        </div>
        <div>
          <label htmlFor="priceMax">Price max</label>
          <input
            id="priceMax"
            name="priceMax"
            value={filterParams.priceMax}
            onChange={(e) => onSearchChange({ priceMax: e.target.value })}
          ></input>
        </div>
        <div>
          <label htmlFor="categoryId">Choose a category:</label>

          <select
            name="categoryId"
            id="categoryId"
            value={filterParams.categoryId}
            onChange={(e) => onSearchChange({ categoryId: e.target.value })}
          >
            <option value=""></option>
            {categoriesQuery.data?.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sortBy">Sort by:</label>

          <select
            name="sortBy"
            id="sortBy"
            value={sortBy}
            onChange={(e) => onSearchChange({ sortBy: e.target.value })}
          >
            <option value=""></option>
            <option value="title">title</option>
            <option value="price">price</option>
          </select>
        </div>
      </div>
      {productsQuery.data?.products.map(({ id, title, price }) => (
        <p key={id}>
          {title} {price.toFixed(2)}
        </p>
      ))}
      {page !== undefined && (
        <>
          <button
            disabled={page === 0}
            onClick={() =>
              onSearchChange({ page: page === 1 ? "" : (page - 1).toString() })
            }
          >
            Prev
          </button>
          <button
            disabled={!productsQuery.data?.hasNextPage}
            onClick={() => onSearchChange({ page: (page + 1).toString() })}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Products;

const Title = ({
  initialValue,
  onChange,
}: {
  initialValue: string;
  onChange: (nextValue: string) => void;
}) => {
  const timerIdRef = useRef<number>();
  const onChangeRef = useRef<(nextValue: string) => void>();

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    onChangeRef.current = onChange;
  });
  useEffect(() => () => clearTimeout(timerIdRef.current), []);

  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={value}
        onChange={(e) => {
          const nextValue = e.target.value;
          setValue(nextValue);

          clearTimeout(timerIdRef.current);
          timerIdRef.current = setTimeout(
            (val: string) => onChangeRef.current?.(val),
            5000,
            nextValue,
          );
        }}
      ></input>
    </div>
  );
};
