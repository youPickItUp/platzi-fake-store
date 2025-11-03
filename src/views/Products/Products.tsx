import { Link, useLocation, useSearchParams } from "wouter";
import { useCategories, useProducts } from "../../api";
import { objectEntries, objectFromEntries } from "tsafe";
import useDeleteProduct from "../../api/products/useDeleteProduct";
import {
  Badge,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Label, Select, TextInput } from "flowbite-react";
import Title from "./Title";

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

  const deleteProductMutation = useDeleteProduct();

  return (
    <div className="bg-gray-50 px-8 py-12">
      <div className="flex flex-row justify-between flex-wrap gap-4">
        <div className="flex max-w-md flex-col gap-4">
          <Card>
            <div className="flex gap-x-4">
              <Title
                initialValue={filterParams.title}
                onChange={(nextValue) => onSearchChange({ title: nextValue })}
              />
              <div className="flex gap-x-2 items-center">
                <Label htmlFor="categoryId">Category:</Label>

                <Select
                  name="categoryId"
                  id="categoryId"
                  value={filterParams.categoryId}
                  onChange={(e) =>
                    onSearchChange({ categoryId: e.target.value })
                  }
                  sizing="sm"
                >
                  <option value=""></option>
                  {categoriesQuery.data?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex gap-x-4">
              <div className="flex gap-x-2 items-center">
                <Label className="shrink-0" htmlFor="priceMin">
                  Price min:
                </Label>
                <TextInput
                  id="priceMin"
                  name="priceMin"
                  value={filterParams.priceMin}
                  onChange={(e) => onSearchChange({ priceMin: e.target.value })}
                  sizing="sm"
                ></TextInput>
              </div>
              <div className="flex gap-x-2 items-center">
                <Label className="shrink-0" htmlFor="priceMax">
                  Price max:
                </Label>
                <TextInput
                  id="priceMax"
                  name="priceMax"
                  value={filterParams.priceMax}
                  onChange={(e) => onSearchChange({ priceMax: e.target.value })}
                  sizing="sm"
                ></TextInput>
              </div>
            </div>
          </Card>
        </div>
        <Link
          to={`/products/new`}
          className="self-end focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Create new product
        </Link>
      </div>
      <Card className="overflow-x-auto my-5 items-center">
        <Table hoverable className="hidden lg:block">
          <TableHead>
            <TableRow>
              <TableHeadCell>
                <button
                  type="button"
                  onClick={() =>
                    onSearchChange({
                      sortBy: sortBy === "title" ? "" : "title",
                    })
                  }
                  className="uppercase cursor-pointer"
                >
                  Title {sortBy === "title" ? "⬇️" : "↕️"}
                </button>
              </TableHeadCell>
              <TableHeadCell>
                <button
                  type="button"
                  onClick={() =>
                    onSearchChange({
                      sortBy: sortBy === "price" ? "" : "price",
                    })
                  }
                  className="uppercase cursor-pointer"
                >
                  Price {sortBy === "price" ? "⬇️" : "↕️"}
                </button>
              </TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit/Delete</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y" data-testid="tableBodyId">
            {productsQuery.data?.products.map(
              ({ id, title, price, category }) => (
                <TableRow
                  key={id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell
                    scope="row"
                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                  >
                    <Link to={`/products/${id}`}>{title}</Link>
                  </TableCell>
                  <TableCell>${price.toFixed(2)}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Link
                      className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none"
                      to={`/products/${id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className="cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                      onClick={() => {
                        const isConfirmed = confirm(
                          "Are you sure you want to delete this product?",
                        );
                        if (isConfirmed) {
                          deleteProductMutation.mutateAsync({
                            id: id.toString(),
                          });
                        }
                      }}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex flex-row gap-x-4">
            <button
              type="button"
              onClick={() =>
                onSearchChange({
                  sortBy: sortBy === "title" ? "" : "title",
                })
              }
              className="uppercase cursor-pointer"
            >
              Title {sortBy === "title" ? "⬇️" : "↕️"}
            </button>
            <button
              type="button"
              onClick={() =>
                onSearchChange({
                  sortBy: sortBy === "price" ? "" : "price",
                })
              }
              className="uppercase cursor-pointer"
            >
              Price {sortBy === "price" ? "⬇️" : "↕️"}
            </button>
          </div>
          {productsQuery.data?.products.map(
            ({ id, title, price, category, images }) => (
              <Card
                className="max-w-sm"
                imgAlt="Product image"
                imgSrc={images[0]}
              >
                <Badge color="info" className="self-start">
                  {category.name}
                </Badge>
                <Link to={`/products/${id}`}>
                  <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {title}
                  </h1>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${price.toFixed(2)}
                  </span>
                  <div className="flex flex-row">
                    <Link
                      className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none"
                      to={`/products/${id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className="cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                      onClick={() => {
                        const isConfirmed = confirm(
                          "Are you sure you want to delete this product?",
                        );
                        if (isConfirmed) {
                          deleteProductMutation.mutateAsync({
                            id: id.toString(),
                          });
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Card>
            ),
          )}
        </div>
        <div className="flex justify-center lg:justify-start gap-x-2">
          <Button
            disabled={page === 0}
            onClick={() =>
              onSearchChange({ page: page === 1 ? "" : (page - 1).toString() })
            }
          >
            Prev
          </Button>
          <Button
            disabled={!productsQuery.data?.hasNextPage}
            onClick={() => onSearchChange({ page: (page + 1).toString() })}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Products;
