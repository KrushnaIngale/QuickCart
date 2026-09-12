import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { AppContext } from "../context/AppContext";

const HomeProducts = () => {
  const { products } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-semibold text-left w-full text-gray-900">Popular Products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
        {products.slice(0, 10).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <button
        onClick={() => navigate("/products")}
        className="px-12 py-2.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-50 transition text-sm"
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
