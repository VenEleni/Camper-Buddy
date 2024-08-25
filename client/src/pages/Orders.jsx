import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../actions/shippingActions";
import { updateOrderStatus } from "../actions/shippingActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Orders.css';
import { Link } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const ordersFetch = useSelector((state) => state.ordersFetch);
  const { loading, error, orders } = ordersFetch || [];
  const [localOrders, setLocalOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  useEffect(() => {
    if (orders) {
      setLocalOrders(orders);
    }
  }, [orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    await dispatch(updateOrderStatus(orderId, newStatus));
    toast.success("Status changed successfully");
    setLocalOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
  
  <Link to="/" className="chip">
            <i className="text-black">home</i>
          </Link>
          <h1 className="text-2xl font-semibold text-black mb-6">Orders</h1>
  <ToastContainer toastClassName="custom-toast" />
  {loading ? (
    <h1 className="text-lg text-black">Loading...</h1>
  ) : error ? (
    <h3 className="text-lg text-black">{error}</h3>
  ) : (
    <div className="bg-white shadow rounded-lg">
      <ul className="divide-y divide-gray-200">
        {localOrders.map((order) => (
          <div key={order._id} className="p-4">
            <li className="flex flex-wrap items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <h4 className="text-lg font-medium text-black">{order.fullName}</h4>
                <p className="text-sm text-black">{order.phone}</p>
                <p className="text-sm text-black">{order.email}</p>
                <p className="text-sm text-black">{order.country}</p>
                <p className="text-sm text-black">{order.address}</p>
                <p className="text-sm text-black">{order.postalCode}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-black"
                >
                  <option className="text-black" value="pending">Pending</option>
                  <option className="text-black" value="shipped">Shipped</option>
                  <option className="text-black" value="delivered">Delivered</option>
                </select>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )}
</div>
  );
};

export default Orders;
