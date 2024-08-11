// components/ProductDetails.js
import React from "react";

const ProductDetails = ({ product, onBack }) => {
  return (
    <div className="grid grid-cols-2 top-36">
      <img className="w-96 col-span-6 ml-40 mt-16" src={product.image} alt={product.name} />
      <div className="col-span-6 ">
        <h2>{product.title}</h2>

        <p>{product.description}</p>
        <p>{product.price} €</p>
        <button onClick={onBack}>Go Back</button>
        <button >Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
