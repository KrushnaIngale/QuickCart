import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import { useContext } from "react";

import { AppContext } from "../context/AppContext";

import Loader from "../components/Loader";
import HeaderSlider from "../components/HeaderSlider";
import FeaturedProducts from "../components/FeaturedProduct";
import Banner from "../components/Banner";
import Newsletter from "../components/NewsLetter";

const Home = () => {
  const { products, loading } = useContext(AppContext);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="min-h-screen bg-slate-100 p-10">
        <h1 className="text-4xl font-bold mb-10">SmartCart</h1>
        <HeaderSlider />
        <div className="mt-20 flex justify-between items-center">
          <div>
            <p className="text-slate-500 uppercase tracking-[4px] text-sm">
              Trending Products
            </p>

            <h2 className="text-4xl font-bold mt-2">Featured Collection</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <FeaturedProducts />

        <Banner />

        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
