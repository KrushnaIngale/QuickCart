import axios from "axios";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
      toast.success("Item Removed");
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
      toast.success("Updated Successfully");
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

      toast.success("Order Placed Successfully");

      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-black">Your Cart Is Empty</h1>

        <p className="text-slate-500 mt-4">
          Add some products to continue shopping
        </p>
        <Link
          to="/products"
          className="mt-8 bg-black text-white px-6 py-3 rounded-2xl"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-black mb-14">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}

        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <CartItem
              key={item.cart_id}
              item={item}
              updateQuantity={updateQuantity}
              removeCartItem={removeCartItem}
            />
          ))}
        </div>

        {/* RIGHT */}

        <OrderSummary cartItems={cartItems} checkout={checkout} />
      </div>
    </div>
  );
};

export default Cart;
