import React, { useEffect, useState } from "react";
import EshopNavBar from "../components/EshopNavBar";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../components/axiosInstance";

const FetchCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth && auth.user ? auth.user.id : null;
  const token = auth.token;

  console.log("userId in FetchCart: ", userId);
  console.log("auth in FetchCart: ", auth);
  console.log("token in FetchCart: ", token);
  
  

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            "x-auth-token": token,
          },
        };
        const { data } = await axiosInstance.get("/cart/fetchCart", config);
        setCartItems(data.cart);
      } catch (error) {
        setError("Error fetching cart items: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <>
    <div>
    <EshopNavBar />
    </div>
      
      <div className="bg-red-300 top-36">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.product._id}>
              <img src={item.product.image} alt={item.product.title} />
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
