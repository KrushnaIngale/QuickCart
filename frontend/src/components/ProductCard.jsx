import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer group"
    >
      <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="group-hover:scale-105 transition duration-300 object-cover w-4/5 h-4/5 md:w-full md:h-full mix-blend-multiply"
        />
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <Heart size={12} className="text-gray-400 hover:text-red-500 transition" />
        </button>
      </div>

      <p className="md:text-base font-medium pt-2 w-full truncate text-gray-800">{product.title}</p>
      <p className="w-full text-xs text-gray-400 max-sm:hidden truncate">{product.description}</p>

      {/* Stars */}
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="text-xs text-gray-500">4.5</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className={`h-3 w-3 ${i < 4 ? "text-orange-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-semibold text-gray-900">₹{product.price}</p>
        <button className="max-sm:hidden px-3 py-1 text-xs text-gray-500 border border-gray-300 rounded-full hover:bg-gray-50 transition">
          Buy now
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
