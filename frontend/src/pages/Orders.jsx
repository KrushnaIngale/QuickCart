import axios from "axios";

import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/orders/",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold mb-10">My Orders</h1>

      <div className="space-y-10">
        {orders.map((order) => (
          <div
            key={order.order_id}
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <div className="flex justify-between mb-5">
              <h2 className="text-2xl font-bold">Order #{order.order_id}</h2>

              <p className="text-green-600 font-semibold">{order.status}</p>
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-5 mb-5">
                <img
                  src={item.product_image}
                  alt=""
                  className="h-24 w-24 rounded-xl object-cover"
                />

                <div>
                  <h3 className="text-xl font-bold">{item.product_title}</h3>

                  <p>Quantity: {item.quantity}</p>

                  <p>₹ {item.price}</p>
                </div>
              </div>
            ))}

            <h2 className="text-2xl font-bold mt-5">
              Total: ₹ {order.total_price}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
