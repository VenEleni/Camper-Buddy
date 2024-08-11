import React, { useEffect, useState  } from "react";
import EshopNavBar from "../components/EshopNavBar";
import "./Eshop.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import ProductDetails from './ProductDetails'

const Eshop = () => {
  const dispatch = useDispatch();
  const productsFetch = useSelector((state) => state.productsFetch);
  const { loading, error, products } = productsFetch || [];
  console.log(products);

  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);


  return (
    <div className="eshop_container">
      <EshopNavBar />

      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)} // Χρησιμοποίησε το onBack prop για να επιστρέψεις στη λίστα
        />
      ) : (

      <div className="flex top-36 eshop_products">
        {products.map((product) => (
          <card
            key={product.id}
            className=" flex flex-col items-center eshop_product"
          >
            <img className="w-52" src={product.image} alt={product.name} onClick={() => setSelectedProduct(product)} />
            <p>{product.title}</p>
            <p>{product.price} €</p>
            <a href="">
              <button className="eshop_button">Buy Now</button>
              See More..
            </a>
          </card>
        ))}
      </div>
      )}
    </div>
  );
};

export default Eshop;
