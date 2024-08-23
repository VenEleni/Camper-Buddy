import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductToUpdate, updateProduct } from "../actions/productActions";
import { useParams } from "react-router-dom";
// import {useHistory} from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  //   const history = useHistory();
  const { product, loading, error } = useSelector(state => state.productUpdateReducer);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    subcategory: "",
    sku: "",
    stock: ""
  });

  useEffect(() => {
    if (id) {
      dispatch(getProductToUpdate(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        image: product.image || "",
        category: product.category || "",
        subcategory: product.subcategory || "",
        sku: product.sku || "",
        stock: product.stock || ""
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    dispatch(updateProduct({ ...formData, _id: id }));
    setMessage("Product updated successfully");
  };

  return (
    <div className='create_product_body'>
        <div className="flex items-center">
        <a href="/eshop" className="bi bi-arrow-return-left mr-10 no-underline top-2"></a>
        <h1>Update Product</h1>
        
        </div>
      
      {message && <p>{message}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form className='create_product_form'  onSubmit={handleSubmit}>
          <div className="field border ">
            <input
              className="create_product_input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder='Name your Product' 
            />
          </div>

          <div className="field border  textarea">
            <textarea
              className="create_product_input"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your Product"
            ></textarea>
          </div>
          <div className="field border ">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field border ">
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>


          <div className="field border ">
            <select
            name="category"
              className="create_product_selection"
              value={formData.category}
              onChange={handleChange}
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
            name="subcategory"
              className="create_product_selection"
              value={formData.subcategory}
              onChange={handleChange}
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
          <div className="field border ">
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field border ">
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <button className="responsive large-elevate primary large create_product_button" type="submit">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;