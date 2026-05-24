import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import { useContext } from "react";

import { AppContext } from "../context/AppContext";

const Home = () => {
  const { products } = useContext(AppContext)

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="min-h-screen bg-slate-100 p-10">
        <h1 className="text-4xl font-bold mb-10">SmartCart</h1>
        <Hero />
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
      </div>
    </div>
  );
};

export default Home;
