import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Home from "./pages/Homepage";
import "beercss/dist/cdn/beer.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import Eshop from "./pages/Eshop";
import CreateProduct from "./pages/CreateProduct";
import FetchCart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import OrderSuccess from "./components/OrderSuccess";
import Orders from "./pages/Orders";
import Blogs from "./pages/Blogs";
import NewBlog from "./pages/NewBlog";
import ReadBlog from "./pages/ReadBlog";
import ForumErrorPage from "./pages/ForumErrorPage";
import UpdateProduct from "./pages/UpdateProduct";
import OAuthCallback from "./components/OAuthCallback";

// const stripePromise = loadStripe('pk_test_51Pp6A1DAYdBNDDpzWqzOXTTwS9zWqVFywfV3GgGIAqtZQDHx3iCwFAcRdxha3QYMLJOWLlRyopicdqhhDqjkOs4600Nd9YHySl');

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/Camper-Buddy">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/eshop" element={<Eshop />} />
            <Route path="/createproduct" element={<CreateProduct />} />
            <Route path="/cart" element={<FetchCart />} />
            <Route path="/ordersuccess" element={<OrderSuccess />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/newblog" element={<NewBlog />} />
            <Route path="/blogs/:id" element={<ReadBlog />} />
            <Route path="/forumerror" element={<ForumErrorPage />} />
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/oauth-callback" element={<OAuthCallback />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
