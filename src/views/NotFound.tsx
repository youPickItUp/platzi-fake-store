import { Button, Card } from "flowbite-react";
import { useLocation } from "wouter";

const NotFound = () => {
  const [, navigate] = useLocation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="text-center shadow-lg w-full max-w-md p-8">
        <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </p>
        <p className="text-gray-500 mb-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <Button pill onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
