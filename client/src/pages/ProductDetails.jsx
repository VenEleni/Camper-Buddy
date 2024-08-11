// components/ProductDetails.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";

const ProductDetails = ({ product, onBack }) => {
    const dispatch = useDispatch();

    // Get the state of the cart from Redux
  const cartState = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
//   const { loading, error } = cartState;

  const handleAddToCart = () => {
    console.log("auth", auth);
    
    // Extract userId from the auth state
    const userId = auth.user ? auth.user.id : null;
    console.log("userId:", userId);
    console.log("auth.user:", auth.user);

    if (userId) {
        dispatch(addToCart(userId, product._id));
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
