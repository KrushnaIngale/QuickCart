import { createContext, useEffect, useState } from "react";

import api from "../utils/api";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // PRODUCTS

  const getProducts = async () => {
    try {
      const response = await api.get("/products/");

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // CART

  const getCartItems = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await api.get("/cart/");

      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // AUTH

  const checkAuth = () => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      await getProducts();

      await getCartItems();

      checkAuth();

      setLoading(false);
    };

    fetchData();
  }, []);

  const value = {
    products,

    cartItems,

    loading,

    isLoggedIn,

    getCartItems,

    setCartItems,

    setIsLoggedIn,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
