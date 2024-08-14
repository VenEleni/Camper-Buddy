// components/ProductDetails.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";

const ProductDetails = ({ product, onBack }) => {
    const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cart);
  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = auth.token;
//   const { loading, error } = cartState;

  const handleAddToCart = async () => {
    
    // Extract userId from the auth state
    const userId = auth.user ? auth.user.id : null;
    console.log("userId in Product Details:", userId);
    console.log("auth.user in Product Details:", auth.user);
    console.log("product._id in Product Details:", product._id);
    console.log("token in Product Details:", token);
    console.log("auth in Product Details:", auth);

    if (userId){
      try {
        await dispatch(addToCart(userId, product._id));
        console.log("Product added to cart successfully");
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      console.log("User not authenticated");
      // Handle cases where user is not authenticated
    }
  };

  return (
    <div className="grid grid-cols-2 top-36">
      <img className="w-96 col-span-6 ml-40 mt-16" src={product.image} alt={product.name} />
      <div className="col-span-6 ">
        <h2>{product.title}</h2>

        <p>{product.description}</p>
        <p>{product.price} €</p>
        <button onClick={onBack}>Go Back</button>
        <button onClick={handleAddToCart} >Add to cart </button>
      </div>
    </div>
  );
};

export default ProductDetails;
