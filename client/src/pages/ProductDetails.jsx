import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import './ProductDetails.css';

const ProductDetails = ({ product, onBack }) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);

  const cartState = useSelector((state) => state.cart);
  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = auth.token;
//   const { loading, error } = cartState;
const handleChange = (e) => {
  setTotalStars(parseInt(Boolean(e.target.value, 10) ? e.target.value : 5));
};

  const handleAddToCart = async () => {
    const userId = auth.user ? auth.user.id : null;
    if (userId){
      try {
        await dispatch(addToCart(userId, product._id));
        console.log("Product added to cart successfully");
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      console.log("User not authenticated");
    }
  };

  return (
    <>
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
    <div className="mt-64 ml-96 mb-64">
      <form action="">
    <fieldset >
  <div className="rating">
      <h5>Star rating</h5>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input className="ratingInput"
              key={star}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => {setRating(currentRating); handleChange(currentRating);}}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
      <p>Your rating is: {rating}</p>
      <br />
    </div>
  <div className="field border label textarea">
    <textarea></textarea>
    <label>Textarea</label>
    <span className="helper">Write your review</span>
  </div>
</fieldset>
<button>Submit</button>
</form>
</div>


    </>
  );
};

export default ProductDetails;
