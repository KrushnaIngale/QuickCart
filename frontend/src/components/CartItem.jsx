const CartItem = ({
  item,

  updateQuantity,

  removeCartItem,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
      {/* IMAGE */}

      <div className="bg-slate-100 rounded-2xl p-4 flex justify-center items-center">
        <img src={item.product.image} className="h-32 w-32 object-contain" />
      </div>

      {/* DETAILS */}

      <div className="flex-1">
        <h1 className="text-2xl font-bold text-slate-800">
          {item.product.title}
        </h1>

        <p className="text-slate-500 mt-2">{item.product.category}</p>

        <h2 className="text-2xl font-black mt-5">₹ {item.product.price}</h2>

        {/* ACTIONS */}

        <div className="flex items-center gap-4 mt-6">
          {/* MINUS */}

          <button
            onClick={() => updateQuantity(item.cart_id, "decrease")}
            className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 transition active:scale-95"
          >
            -
          </button>

          {/* QUANTITY */}

          <span className="text-xl font-bold">{item.quantity}</span>

          {/* PLUS */}

          <button
            onClick={() => updateQuantity(item.cart_id, "increase")}
            className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 transition active:scale-95"
          >
            +
          </button>

          {/* REMOVE */}

          <button
            onClick={() => removeCartItem(item.cart_id)}
            className="ml-5 text-red-500 hover:text-red-600 font-semibold"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
