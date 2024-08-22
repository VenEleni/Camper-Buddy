import React, { useEffect, useState } from "react";
import EshopNavBar from "../components/EshopNavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../actions/cartActions";
import "bootstrap-icons/font/bootstrap-icons.css";
import { removeFromCart } from "../actions/cartActions";
import { reduceCartItemQuantity} from "../actions/cartActions";
import {increaseCartItemQuantity} from "../actions/cartActions";
import eshop_img from '../assets/eshop_img.jpeg';

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
      <div>
      <img src={eshop_img} alt='eshop' className='eshop_banner'/>
    </div>
    { (cartItems && cartItems.length > 0) && ( 
  <a href="/checkout" className=" text-black font-bold my-10 mx-20">Place your Order</a>
) }

      <div className=" top-3 mb-16">
        {cartItems && cartItems.length > 0 ?(
          cartItems.map((item) => (    
            <div key={item.product._id} className="flex items-center">
              <div className="ml-10">
              
              <img
                className="w-32 ml-10"
                src={item.product.image}
                alt={item.product.title}
              />
              
              
              </div>
              
              <div className="ml-10">
                <div className="flex items-center">
              <p className="text-black text-sm top-2 mr-5">{item.product.title}</p>
              <div className="flex items-center">
              <i className="bi bi-dash text-black cursor-pointer" onClick={() => handleReduceQuantityFromCart(item.product)}></i>
              <p className="text-black text-sm"> {item.quantity}</p>
              <i className="bi bi-plus text-black cursor-pointer" onClick={()=> handleIncreaseQuantityFromCart(item.product)}></i>
              </div>
              </div>
              <p className="text-black text-sm">Price: {item.product.price} €</p>
              
              </div>
              <i className="bi bi-x-lg text-black ml-10 cursor-pointer" onClick={() => handleRemoveFromCart(item.product)}></i>
            </div>
          ))
          
        )  : (
          <p>Your cart is empty</p>
        )}
     
      </div>
    </>
  );
};

export default FetchCart;
