import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300 hover:-translate-y-2 group">
        <div className="overflow-hidden relative">
          <img
            src={product.image}
            alt=""
            className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
            New
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-semibold text-slate-800 line-clamp-1">
            {product.title}
          </h2>

          <p className="text-slate-500 mt-2">{product.category}</p>

          <div className="flex justify-between items-center mt-5">
            <h3 className="text-2xl font-bold text-black">₹ {product.price}</h3>

            <button className="bg-black text-white px-5 py-2 rounded-xl hover:bg-slate-800 transition">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
