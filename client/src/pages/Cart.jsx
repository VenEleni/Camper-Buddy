import React, { useEffect, useState } from "react";
import EshopNavBar from "../components/EshopNavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../actions/cartActions";
import "bootstrap-icons/font/bootstrap-icons.css";
import { removeFromCart } from "../actions/cartActions";
import { reduceCartItemQuantity} from "../actions/cartActions";
import {increaseCartItemQuantity} from "../actions/cartActions";

const FetchCart = () => {
  const dispatch = useDispatch();
  const fetchCart = useSelector((state) => state.cartReducer);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth && auth.user ? auth.user.id : null;
  const { loading, error, cartItems } = fetchCart || [];

  console.log("fetchCart: ", fetchCart);
  console.log("cartItems: ", cartItems);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);
  
  useEffect(() => {
    // This effect will run whenever cartItems changes
    console.log("cartItems changed: ", cartItems);
  }, [cartItems]);

  const handleRemoveFromCart = async (product) => {
    if (userId) {
      console.log(
        "I'm in the handleRemoveFromCart and product is :",
        product._id
      );
      try {
        await dispatch(removeFromCart(userId, product._id));
        console.log("Product removed from cart successfully");
      } catch (error) {
        console.error("Error removing product from cart:", error);
      }
    } else {
      console.log("User not authenticated for deleting from cart");
    }
  };
  
  const handleReduceQuantityFromCart = async (product) => {
    try {
      await dispatch(reduceCartItemQuantity(userId, product._id));
      console.log("Product's quantity reduced successfully");
    } catch (error) {
      console.error("Error reducing product from cart:", error);
    }
  }

  const handleIncreaseQuantityFromCart = async (product) => {
    try {
      await dispatch(increaseCartItemQuantity(userId, product._id));
      console.log("Product's quantity increased successfully");
    } catch (error) {
      console.error("Error increasing product from cart:", error);
    }
  }

  return (
    <>
      <div>
        <EshopNavBar />
      </div>

      <div className="bg-red-300 top-36">
        {cartItems && cartItems.length > 0 ?(
          cartItems.map((item) => (    
            <div key={item.product._id} className="flex">
              <img
                className="w-24"
                src={item.product.image}
                alt={item.product.title}
              />
              <p>{item.product.title}</p>
              <p>{item.product.price} €</p>
              
              <i className="bi bi-dash-lg" onClick={() => handleReduceQuantityFromCart(item.product)}></i>
              <p>Quantity: {item.quantity}</p>
              <i className="bi bi-plus-lg" onClick={()=> handleIncreaseQuantityFromCart(item.product)}></i>
              <span
                onClick={() => handleRemoveFromCart(item.product)}
              >Remove</span>
            </div>
          ))
          
        )  : (
          <p>Your cart is empty</p>
        )}
        {cartItems && cartItems.length > 0 ? ( 
  <a href="/checkout" className=" text-white font-bold py-2 px-4 rounded">Make your Order</a>
) : (
  <p>Your cart is empty</p>
)}
      </div>
    </>
  );
};

export default FetchCart;
