import React, { useEffect, useState  } from "react";
import EshopNavBar from "../components/EshopNavBar";
import "./Eshop.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsByCategory } from "../actions/productActions";
import ProductDetails from './ProductDetails'

const Eshop = () => {
  const dispatch = useDispatch();
  const productsFetch = useSelector((state) => state.productsFetch);
  const fetchFilteredProducts = useSelector((state) => state.fetchFilteredProducts);
  const [productsToDisplay, setproductsToDisplay] = useState([]);
  const auth = useSelector((state) => state.auth);
  // const state = useSelector((state) => state);
  const { loading, error, products } = productsFetch  || [];
  const { loading: loadingFiltered, error: errorFiltered, filteredProducts = [] } = fetchFilteredProducts || [];
  
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

  console.log("productsToDisplay", productsToDisplay);


  return (
    <div className="eshop_container">
      <EshopNavBar onCategoryChange={handleCategoryChange} />

      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)} // use onBack prop to come back in this page
        />
      ) : (

      <div className="flex top-36 eshop_products">
        {productsToDisplay.map((product) => (
          <div
            key={product.id}
            className=" flex flex-col items-center mx-7 eshop_product"
          >
            <img className="w-52" src={product.image} alt={product.name} onClick={() => setSelectedProduct(product)} />
            <p>{product.title}</p>
            <p>{product.price} €</p>
            <a href="">
              <button className="eshop_button">Buy Now</button>
              See More..
            </a>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Eshop;
