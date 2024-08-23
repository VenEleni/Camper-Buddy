import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productActions";
import "beercss/dist/cdn/beer.min.css";
import "./CreateProduct.css";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title,
      description,
      price,
      image,
      category,
      subcategory,
      sku,
      stock,
    };

    dispatch(createProduct(productData));
    setMessage("Product created successfully!");
    navigate("/eshop");
  };

  return (
    <div className="create_product_body">
      <fieldset>
        <legend className="">
          Fill all the fields
          <a href="/" className="chip">
            <i>home</i>
          </a>
        </legend>
        <form className="create_product_form" onSubmit={handleSubmit}>
          <div className="field border ">
            <input
              className="create_product_input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Name your Product"
            />
          </div>
          <div className="field border ">
            <select
              className="create_product_selection"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option>Camping Tents</option>
              <option>Camping Essentials</option>
              <option>Accessories & Extras</option>
            </select>
          </div>
          <div className="field border ">
            <select
              className="create_product_selection"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
            >
              <option value="">Select Subcategory</option>
              <option>Winter Tents</option>
              <option>Summer Tents</option>
              <option>4-Season Tents</option>
              <option>Hammock Tents</option>
              <option>Shade Tents</option>
              <option>Sleeping Equipment</option>
              <option>Survival Supplies</option>
              <option>Lighting Products</option>
              <option>Cooking & Food Equipment</option>
              <option>Personal Care</option>
              <option>Backpacks</option>
              <option>Clothing</option>
              <option>Camping Furniture</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field border  textarea">
            <textarea
              className="create_product_input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe your Product"
            ></textarea>
          </div>
          <div className="field border ">
            <input
              className="create_product_input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Price in euro"
            />
          </div>
          <div className="field border ">
            <input
              className="create_product_input"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              placeholder="Image URL"
            />
          </div>
          <div className="field border ">
            <input
              className="create_product_input"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              placeholder="Stock"
            />
          </div>
          <div className="field border ">
            <input
              className="create_product_input"
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
              placeholder="Code"
            />
          </div>
          <button
            className="responsive large-elevate primary large create_product_button"
            type="submit"
          >
            Upload new product
          </button>
        </form>
        {error && <p className="text-white">Error: {error}</p>}
        {message && <p className="text-white">{message}</p>}
      </fieldset>
    </div>
  );
};

export default CreateProduct;
