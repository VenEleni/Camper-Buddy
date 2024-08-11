import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
import "beercss/dist/cdn/beer.min.css";

 const CreateProduct = () => {
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [price, setPrice] = useState(0);
        const [image, setImage] = useState('');
        const [category, setCategory] = useState('');
        const [subcategory, setSubcategory] = useState('');
        const [sku, setSku] = useState('');
        const [stock, setStock] = useState(0);
      
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
        };

  return (
    <>
      <fieldset>
        <legend>
          Fill all fields
          <a href="/" className="chip">
            <i>home</i>
          </a>
        </legend>
        <form onSubmit={handleSubmit}>
        <div className="field border label">
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          <label>Name your Product</label>
        </div>
        <div className="field border label">
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
            <option>Camping Tents</option>
            <option>Camping Essentials</option>
            <option>Accessories & Extras</option>
          </select>
          <label>Select Category</label>
        </div>
        <div className="field border label">
          <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required>
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
          <label>Select Subcategory</label>
        </div>
        <div className="field border label textarea">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          <label>Describe your Product</label>
        </div>
        <div className="field border label">
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <label>Price</label>
        </div>
        <div className="field border label">
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
          <label>Image URL</label>
        </div>
        <div className="field border label">
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
          <label>Stock</label>
        </div>
        <div className="field border label">
          <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />
          <label>Sku</label>
        </div>
        <button className="responsive large-elevate primary large" type="submit">Button</button>
        </form>
        {error && <p>Error: {error}</p>}
        {product && <p>Product created successfully!</p>}
      </fieldset>
    </>
  );
};

export default CreateProduct;
