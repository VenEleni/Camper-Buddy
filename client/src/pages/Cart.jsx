import React, { useEffect, useState } from "react";
import EshopNavBar from "../components/EshopNavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../actions/cartActions";
import "bootstrap-icons/font/bootstrap-icons.css";
import { removeFromCart } from "../actions/cartActions";
import { reduceCartItemQuantity } from "../actions/cartActions";
import { increaseCartItemQuantity } from "../actions/cartActions";
import eshop_img from "../assets/eshop_img.jpeg";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const FetchCart = () => {
  const dispatch = useDispatch();
  const fetchCart = useSelector((state) => state.cartReducer);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth && auth.user ? auth.user.id : null;
  const { loading, error, cartItems } = fetchCart || [];
  const [cartMessage, setCartMessage] = useState("");

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
  };

  const handleIncreaseQuantityFromCart = async (product) => {
    try {
      await dispatch(increaseCartItemQuantity(userId, product._id));
      console.log("Product's quantity increased successfully");
    } catch (error) {
      console.error("Error increasing product from cart:", error);
      setCartMessage("Error reducing product! Not enough stock");
    }
  };

  return (
    <>
      <div>
        <EshopNavBar />
      </div>
      <div>
        <img src={eshop_img} alt="eshop" className="eshop_banner" />
      </div>
      {cartItems && cartItems.length > 0 && (
        <Link to="/checkout" className=" text-black font-bold my-10 mx-20">
          Place your Order
        </Link>
      )}
  
      <div className=" top-3 mb-16">
        {cartItems && cartItems.length > 0 ? (
          <div>
            {cartItems.map((item) => (
              <div key={item.product._id}>
                <div className="flex items-center">
                  <div className="ml-10">
                    <img
                      className="w-32 ml-10"
                      src={item.product.image}
                      alt={item.product.title}
                    />
                  </div>
  
                  <div className="ml-10">
                    <div className="flex items-center">
                      <p className="text-black text-sm top-2 mr-5">
                        {item.product.title}
                      </p>
                      <div className="flex items-center">
                        <i
                          className="bi bi-dash text-black cursor-pointer"
                          onClick={() =>
                            handleReduceQuantityFromCart(item.product)
                          }
                        ></i>
                        <p className="text-black text-sm"> {item.quantity}</p>
                        <i
                          className="bi bi-plus text-black cursor-pointer"
                          onClick={() =>
                            handleIncreaseQuantityFromCart(item.product)
                          }
                        ></i>
                      </div>
                    </div>
                    <p className="text-black text-sm">
                      Price: {item.product.price * item.quantity} €
                    </p>
                  </div>
                  <i
                    className="bi bi-x-lg text-black ml-10 cursor-pointer"
                    onClick={() => handleRemoveFromCart(item.product)}
                  ></i>
                </div>
              </div>
            ))}
            {cartMessage && <p className="text-black">{cartMessage}</p>}
            <div className=" text-black font-bold my-10 ml-80">
              Total:{" "}
              {cartItems.reduce(
                (acc, current) =>
                  acc + current.product.price * current.quantity,
                0
              )}{" "}
              €
            </div>
          </div>
        ) : (
          <h4 className="text-black left-96 ml-56 p-10">Your cart is empty</h4>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FetchCart;
