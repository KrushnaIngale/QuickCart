import { createContext, useEffect, useState } from "react";
import api from "../utils/api";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getProducts = async () => {
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await api.get("/cart/");
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await api.get("/auth/me");
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    return !!token;
  };

  // Handle Google OAuth callback token in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromGoogle = params.get("token");
    if (tokenFromGoogle) {
      localStorage.setItem("token", tokenFromGoogle);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const loggedIn = checkAuth();
      await getProducts();
      if (loggedIn) {
        await getCartItems();
        await getUserData();
      }
      setLoading(false);
    };
    init();
  }, []);

  const value = {
    products,
    cartItems,
    loading,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    getCartItems,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
