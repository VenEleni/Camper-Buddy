import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../actions/shippingActions";
import { updateOrderStatus } from "../actions/shippingActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div>
      <h1>Orders</h1>
      <ToastContainer />
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div>
           <ul>
            {localOrders.map((order) => (
              <div key={order._id}>
                <li className="w-10/12 flex items-center justify-evenly">
                  <h4>{order.fullName}</h4>
                  <p>{order.phone}</p>
                  <p>{order.email}</p>
                  <p>{order.country}</p>
                  <p>{order.address}</p>
                  <p>{order.postalCode}</p>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </li>
                <div className="line"></div>
              </div>
            ))}
          </ul>
          </div>
      )}
    </div>
  );
};

export default Orders;
