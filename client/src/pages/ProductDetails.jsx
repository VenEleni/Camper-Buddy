import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import './ProductDetails.css';
import {createReview} from '../actions/reviewActions';
import {fetchReviews} from '../actions/reviewActions';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProductDetails = ({ product, onBack }) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);
    const [comment, setComment] = useState("");
    const [averageRating, setAverageRating] = useState(0);
    const auth = useSelector((state) => state.auth);
    const [cartMessage, setCartMessage] = useState(""); 
    const [submitReviewMessage, setSubmitReviewMessage] = useState(""); 


  // const auth = JSON.parse(localStorage.getItem('auth'));

  useEffect(() => {
    dispatch(fetchReviews(product._id));
    console.log("product._id is : ", product._id);
    
  }, [dispatch, product._id]);

  useEffect(() => {
    if (product.reviews && product.reviews.length > 0) {
      const sum = product.reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const avg = sum / product.reviews.length;
      setAverageRating(avg);
    }
  }, [product.reviews]);



// const handleChange = (e) => {
//   console.log("e.target.value is : ", e.target.value);
//   const value = parseInt(e.target.value, 10);
//   console.log("value is : ", value);
  
//   setTotalStars(parseInt(Boolean(e.target.value, 10) ? e.target.value : 5));
// };

// console.log("totalStars is : ", totalStars);


  const handleAddToCart = async () => {
    const userId = auth.user ? auth.user.id : null;
    if (userId){
      try {
        await dispatch(addToCart(userId, product._id));
        setCartMessage("Product added to cart successfully");
      } catch (error) {
        setCartMessage("Error adding product to cart!");
        console.error("Error adding product to cart:", error);
      }
    } else {
      setCartMessage("User not authenticated");
      console.log("User not authenticated");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { rating, comment };
    console.log("reviewData is : ", reviewData);
    
    try {
        await dispatch(createReview(product._id, reviewData));
        setSubmitReviewMessage("Review submitted successfully");
        console.log("Review submitted successfully:", reviewData);
    } catch (error) {
        setSubmitReviewMessage("Error submitting review!");
        console.error("Error submitting review:", error);
    }
};

  return (
    <>
    <i className="bi bi-arrow-left text-black cursor-pointer mt-3 ml-20" onClick={onBack}></i>
    <div className="grid grid-cols-2">
    
      <img className="w-96 col-span-6 ml-40 " src={product.image} alt={product.name} />
      <div className="col-span-6 mr-10">
        <h2 className="text-black">{product.title}</h2>

        <p className="text-black">{product.description}</p>
        <p className="text-black">{product.price} €</p>
        <p className="text-black">Rating: {averageRating.toFixed(0)} / 5</p>
        {auth.isAuthenticated ? (
          <>
        <button onClick={handleAddToCart} >Add to cart </button>
        {cartMessage && <p className="text-black mt-2 ">{cartMessage}</p>}
        </>
        ) : (
          <p className="text-black" >Please <a className="text-black" href="/login">log in</a> to add to cart</p>
        )}
      </div>
    </div>
    <div className="mt-10  mb-64 pb-8">
      <div >
    <h3 className="text-black ml-10">Reviews:</h3>
    {product.reviews && product.reviews.length === 0 && <p className="text-black ml-10">No reviews yet</p>}
    <ul>
      {product.reviews && product.reviews.map((review) => (
        <li className="text-black" key={review._id}>
           <p><strong>{review.username}</strong> says:</p>
          <p className="text-black">Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
        </li>
      ))}
    </ul>
    </div>
    {auth.isAuthenticated ? (
      <form className="bg-white ml-96 left-40 w-96 h-96" onSubmit={handleSubmit}>
    <fieldset >
  <div className="rating">
      <h5 className="text-black">Star rating</h5>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input className="ratingInput"
              key={star}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => {setRating(currentRating)}}
            />
            <span
              className={`star ${currentRating <= (hover || rating) ? 'star-highlight' : 'star-default'}`}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
      <p className="text-black">Your rating is: {rating}</p>
      <br />
    </div>
  <div className="field border label textarea">
    <textarea className="text-black review_textarea" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
    
    <span className="helper text-black">Write your review</span>
  </div>
</fieldset>
<button type="submit">Submit</button>
{submitReviewMessage && <p className="text-black mt-2">{submitReviewMessage}</p>}
</form>
    ): (
      <p className="text-black ml-10">Please <a className="text-black" href="/login">log in</a> to leave a review</p>
    )}
</div>


    </>
  );
};

export default ProductDetails;
