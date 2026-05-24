import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  if (!product) {
    return <h1 className="text-3xl p-10">Loading...</h1>;
  }

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }
      await axios.post(
        "http://127.0.0.1:8000/cart/",
        {
          product_id: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      window.location.reload();

      alert("Added To Cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT IMAGE SECTION */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <img
              src={product.image}
              alt=""
              className="w-full h-[600px] object-cover rounded-3xl"
            />
          </div>

          {/* RIGHT DETAILS SECTION */}

          <div>
            <p className="uppercase tracking-[4px] text-slate-500 text-sm">
              {product.category}
            </p>

            <h1 className="text-5xl font-black mt-4 leading-tight text-slate-900">
              {product.title}
            </h1>

            {/* Rating */}

            <div className="flex items-center gap-3 mt-6">
              <div className="flex text-yellow-500 text-xl">★★★★★</div>

              <p className="text-slate-500">120+ Reviews</p>
            </div>

            {/* Price */}

            <div className="mt-8 flex items-center gap-5">
              <h2 className="text-5xl font-bold text-black">
                ₹ {product.price}
              </h2>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                In Stock
              </span>
            </div>

            {/* Description */}

            <p className="mt-10 text-slate-600 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Product Highlights */}

            <div className="mt-10 grid grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-lg">Free Delivery</h3>

                <p className="text-slate-500 mt-2">
                  Delivery within 3-5 business days.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-lg">Secure Payment</h3>

                <p className="text-slate-500 mt-2">
                  100% secure payment gateway.
                </p>
              </div>
            </div>

            {/* CTA */}

            <div className="flex gap-5 mt-12">
              <button
                onClick={addToCart}
                className="bg-black text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-slate-800 transition"
              >
                Add To Cart
              </button>

              <button className="border border-slate-300 px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-slate-100 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
