import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

const OrderSummary = ({ cartItems, onOrderPlaced }) => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  );
  const tax = Math.floor(subtotal * 0.02);
  const total = subtotal + tax;

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await api.post("/orders/checkout", {});
      onOrderPlaced?.();
      navigate("/orders");
      await toast.success("Order Placed Successfully")
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-96 bg-gray-50 border border-gray-200 rounded-xl p-6">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Order Summary</h2>
      <hr className="border-gray-200 my-5" />

      <div className="space-y-6">
        {/* Promo Code */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="w-full outline-none p-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg focus:border-orange-400 transition"
            />
            <button className="bg-orange-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-orange-700 transition w-fit">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Totals */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between font-medium">
            <p className="uppercase text-gray-500 tracking-wide text-xs">
              Items ({cartItems.reduce((s, i) => s + i.quantity, 0)})
            </p>
            <p className="text-gray-800">₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Shipping Fee</p>
            <p className="font-medium text-green-600">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Tax (2%)</p>
            <p className="font-medium text-gray-700">₹{tax}</p>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-4 mt-2">
            <p>Total</p>
            <p className="text-orange-600">₹{total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading || cartItems.length === 0}
        className="w-full bg-orange-600 text-white py-3.5 mt-6 rounded-xl hover:bg-orange-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
