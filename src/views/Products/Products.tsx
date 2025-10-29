import useProducts from "./useProducts";

const Products = () => {
  const product = useProducts();

  return (
    <div>
      Products
      {product.data?.map(({ title }) => (
        <p>{title}</p>
      ))}
    </div>
  );
};

export default Products;
