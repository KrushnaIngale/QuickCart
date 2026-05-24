import axios from "axios";

import { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/cart/",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const removeCartItem = async (cartId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://127.0.0.1:8000/cart/${cartId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (cartId, action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://127.0.0.1:8000/cart/${cartId}?action=${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,

    0,
  );

  const checkout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/orders/checkout",

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Order Placed Successfully");

      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold mb-10">My Cart</h1>

      <div className="space-y-5">
        {cartItems.map((item) => (
          <div
            key={item.cart_id}
            className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-5"
          >
            <img
              src={item.product.image}
              alt=""
              className="h-32 w-32 object-cover rounded-xl"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-bold">{item.product.title}</h2>

              <p className="text-slate-500 mt-2">{item.product.category}</p>

              <p className="mt-3 text-xl font-semibold">
                ₹ {item.product.price}
              </p>

              <p className="mt-2">Quantity: {item.quantity}</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => updateQuantity(item.cart_id, "decrease")}
                className="bg-slate-200 h-10 px-4 py-2 rounded-lg"
              >
                -
              </button>

              <button
                onClick={() => updateQuantity(item.cart_id, "increase")}
                className="bg-slate-200 h-10 px-4 py-2 rounded-lg"
              >
                +
              </button>

              <button
                onClick={() => removeCartItem(item.cart_id)}
                className="bg-red-500 h-10 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>

              <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-3xl font-bold">Total: ₹ {totalPrice}</h2>
              </div>
              <button
                onClick={checkout}
                className="mt-5 bg-black text-white px-8 py-4 rounded-xl"
              >
                Checkout
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
