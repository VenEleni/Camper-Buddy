import React, { useEffect, useState } from "react";
import EshopNavBar from "../components/EshopNavBar";
import { useDispatch, useSelector } from "react-redux";
// import axiosInstance from "../components/axiosInstance";
import {fetchCartItems} from "../actions/cartActions";

const FetchCart = () => {
  const dispatch = useDispatch();
  const fetchCart = useSelector((state) => state.fetchCart);
  // const auth = JSON.parse(localStorage.getItem('auth'));
  // const userId = auth && auth.user ? auth.user.id : null;
  // const token = auth.token;
  const { loading, error, cartItems } = fetchCart || [];

  // console.log("userId in FetchCart: ", userId);
  // console.log("token in FetchCart: ", token);
  console.log("cartItems: ", cartItems);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  return (
    <>
    <div>
    <EshopNavBar />
    </div>
      
      <div className="bg-red-300 top-36">
        {(cartItems && cartItems.length > 0) ? (
          cartItems.map((item) => (
            <div key={item.product._id}>
              <img className="w-24" src={item.product.image} alt={item.product.title} />
              <p>{item.product.title}</p>
              <p>{item.product.price} €</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </>
  );
};

export default FetchCart;
