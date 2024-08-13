import React, { useEffect} from "react";
import EshopNavBar from "../components/EshopNavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../actions/cartActions";

const FetchCart = () => {
    const dispatch = useDispatch();
    const fetchCart = useSelector((state) => state.fetchCart);
    const state = useSelector((state) => state);
    const auth = useSelector((state) => state.auth);
    const userId = auth.user ? auth.user.id : null;
    const { loading, error, cartItems } = fetchCart || [];


  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  console.log("fetchCart: ", fetchCart);
  console.log("state: ", state);
  console.log("userId on Cart is : ", userId);
  console.log("cartItems on Cart: ", cartItems);


    return (
        <></>
    )
}

export default FetchCart;