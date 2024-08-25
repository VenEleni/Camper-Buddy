import React, { useEffect, useState  } from "react";
import EshopNavBar from "../components/EshopNavBar";
import "./Eshop.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsByCategory } from "../actions/productActions";
import ProductDetails from './ProductDetails'
import eshop_img from '../assets/eshop_img.jpeg';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Eshop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsFetch = useSelector((state) => state.productsFetch);
  const fetchFilteredProducts = useSelector((state) => state.fetchFilteredProducts);
  const [productsToDisplay, setproductsToDisplay] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { loading, error, products } = productsFetch  || [];
  const { loading: loadingFiltered, error: errorFiltered, filteredProducts = [] } = fetchFilteredProducts || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); 
  const [selectedCategory, setSelectedCategory] = useState("All products");
  const [searchQuery, setSearchQuery] = useState("");
  
  console.log("auth state in eshop page", auth);

  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleCategoryChange = (category, subcategory) => {
    console.log('Category change:', category, subcategory);
    setSelectedCategory(subcategory);
    dispatch(fetchProductsByCategory(category, subcategory));
    
    
  };

  useEffect(() => {
    if (filteredProducts.length > 0) {
      setproductsToDisplay([...filteredProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } else {
      setproductsToDisplay([...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  }, [filteredProducts, products]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products
        .filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setproductsToDisplay(filtered);
    } else {
      setproductsToDisplay([...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  }, [searchQuery, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsToDisplay.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productsToDisplay.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log("productsToDisplay", productsToDisplay);


  return (
    <div className="eshop_container">
    <EshopNavBar onCategoryChange={handleCategoryChange} />
    <div>
      <img src={eshop_img} alt='eshop' className='eshop_banner'/>
    </div>
    {!selectedProduct && (
    <div className="category-title flex justify-center">
        <h3 className='text-black top-5 mr-10'>{selectedCategory}</h3>
        <div className="search-bar flex justify-center top-4">
        <input 
          type="text"
          placeholder="Search product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input text-black p-2"
        />
      </div>
      </div>
    )}


    {selectedProduct ? (
      <ProductDetails
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    ) : (
      <>
        <div className="flex top-24 eshop_products">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center mx-7 eshop_product"
            >
              <div className="product-image-wrapper relative">
                <img className="w-52" src={product.image} alt={product.name} />
                <div className="hover-overlay" onClick={() => setSelectedProduct(product)}>
                  <span className="hover-text text-black">See More..</span>
                </div>
                {auth.isAuthenticated && auth.user && auth.user.role === 'admin' && (
                <i onClick={() =>  navigate(`/updateproduct/${product._id}`)} className="bi bi-pencil-fill absolute top-0 right-0 m-2 text-black cursor-pointer no-underline"></i>
                )}
                </div>
              <p className="text-black">{product.title}</p>
            </div>
          ))}
        </div>
        <div className="pagination-container mt-32">
        <Pagination className="pagination-custom text-black">
          {pageNumbers.map(number => (
            <Pagination.Item  key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
        </div>
      </>
    )}
    <Footer />
  </div>
);
};

export default Eshop;
