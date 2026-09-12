import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const AllProducts = () => {
  const { products, loading } = useContext(AppContext);

  return (
    <>
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 min-h-screen">
        <div className="flex flex-col items-start pt-12 mb-2">
          <p className="text-2xl font-semibold text-gray-900">All Products</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full mt-1" />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10 pb-14 w-full">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
