import { useProduct } from "../../api";

const Product = ({ id }: { id: string }) => {
  const { data: product } = useProduct(id);
  return <div>Product {product?.title}</div>;
};

export default Product;
