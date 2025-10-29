import useProducts from "./useProducts";

const Products = () => {
  const product = useProducts();

  return (
    <div>
      Products
      {product.data?.map(({ id, title }) => (
        <p key={id}>{title}</p>
      ))}
    </div>
  );
};

export default Products;
