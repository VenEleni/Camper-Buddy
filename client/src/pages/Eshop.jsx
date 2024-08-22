import React, { useEffect, useState  } from "react";
import EshopNavBar from "../components/EshopNavBar";
import "./Eshop.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsByCategory } from "../actions/productActions";
import ProductDetails from './ProductDetails'
import eshop_img from '../assets/eshop_img.jpeg';
import Pagination from 'react-bootstrap/Pagination';

const Eshop = () => {
  const dispatch = useDispatch();
  const productsFetch = useSelector((state) => state.productsFetch);
  const fetchFilteredProducts = useSelector((state) => state.fetchFilteredProducts);
  const [productsToDisplay, setproductsToDisplay] = useState([]);
  const auth = useSelector((state) => state.auth);
  // const state = useSelector((state) => state);
  const { loading, error, products } = productsFetch  || [];
  const { loading: loadingFiltered, error: errorFiltered, filteredProducts = [] } = fetchFilteredProducts || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); 
  
  console.log("auth state in eshop page", auth);

  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleCategoryChange = (category, subcategory) => {
    console.log('Category change:', category, subcategory);
    dispatch(fetchProductsByCategory(category, subcategory));
    
    
  };

  useEffect(() => {
    console.log('filteredProducts:', filteredProducts); // Debugging line
    console.log('products:', products); // Debugging line

    if (filteredProducts.length > 0) {
      setproductsToDisplay(filteredProducts);
    } else {
      setproductsToDisplay(products);
    }
  }, [filteredProducts, products]);

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

    {selectedProduct ? (
      <ProductDetails
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    ) : (
      <>
        <div className="flex top-36 eshop_products">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center mx-7 eshop_product"
            >
              <div className="product-image-wrapper">
                <img className="w-52" src={product.image} alt={product.name} />
                <div className="hover-overlay" onClick={() => setSelectedProduct(product)}>
                  <span className="hover-text text-black">See More..</span>
                </div>
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
  </div>
);
};

export default Eshop;
