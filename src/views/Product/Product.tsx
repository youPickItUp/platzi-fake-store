import useProduct from "./useProduct";

const Product = ({ id }: { id: number }) => {
  const { data: product } = useProduct(id);
  return <div>Product {product?.title}</div>;
};

export default Product;
