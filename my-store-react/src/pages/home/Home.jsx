import React, { useState, useEffect } from "react";
import apiHandler from "../../utils/apiHandler";
import endpoint from "../../enums/endpoint";

const Home = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const authToken = localStorage.getItem("JsonToken");
      if (!authToken) {
        throw new Error("No authentication token found.");
      }
      const response = await apiHandler(endpoint.ORDERS, "GET", null, {
        Authorization: authToken,
      });
      setOrders(response.data.orders);
      console.log("Orders fetched successfully:", response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Shop Orders</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
          >
            <span className="text-lg font-semibold">
              {order.line_items[0].title}
            </span>
            <span className="text-lg text-gray-600">${order.total_price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
