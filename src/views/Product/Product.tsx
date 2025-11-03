import { Badge, Button, Card, Carousel } from "flowbite-react";
import { useProduct } from "../../api";
import { useLocation } from "wouter";
import clsx from "clsx";

const Product = ({ id }: { id: string }) => {
  const [, navigate] = useLocation();
  const productQuery = useProduct(id);

  if (productQuery.isError)
    return (
      <Card className="max-w-4xl mx-auto p-4">
        <Badge color="red">Error loading product</Badge>
      </Card>
    );

  return (
    <div
      className={clsx("max-w-4xl mx-auto p-4", {
        "opacity-50": productQuery.isLoading,
      })}
    >
      <Card className="shadow-lg bg-white/70 backdrop-blur-md border border-gray-200">
        <div className="grid md:grid-cols-2 gap-6">
          {/* --- Product Image Carousel --- */}
          <div className="h-64 md:h-80">
            <Carousel>
              {productQuery.data?.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={productQuery.data?.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              ))}
            </Carousel>
          </div>

          {/* --- Product Info --- */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {productQuery.data?.title}
              </h1>
              <p className="text-gray-600 mt-2">
                {productQuery.data?.description}
              </p>

              <div className="mt-4">
                <Badge color="info" className="inline-block">
                  {productQuery.data?.category?.name}
                </Badge>
              </div>

              <p className="text-3xl font-bold text-emerald-600 mt-6">
                ${productQuery.data?.price}
              </p>
            </div>
          </div>
          <Button onClick={() => navigate(`/products/${id}/edit`)}>Edit</Button>
        </div>
      </Card>
    </div>
  );
};

export default Product;
