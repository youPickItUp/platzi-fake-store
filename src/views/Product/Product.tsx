import { Badge, Card, Carousel } from "flowbite-react";
import { useProduct } from "../../api";

const Product = ({ id }: { id: string }) => {
  const { data: product } = useProduct(id);

  if (!product) return "Loading";

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-lg bg-white/70 backdrop-blur-md border border-gray-200">
        <div className="grid md:grid-cols-2 gap-6">
          {/* --- Product Image Carousel --- */}
          <div className="h-64 md:h-80">
            <Carousel>
              {product.images?.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={product.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              ))}
            </Carousel>
          </div>

          {/* --- Product Info --- */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {product.title}
              </h1>
              <p className="text-gray-600 mt-2">{product.description}</p>

              <div className="mt-4">
                <Badge color="info">{product.category?.name}</Badge>
              </div>

              <p className="text-3xl font-bold text-emerald-600 mt-6">
                ${product.price}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Product;
