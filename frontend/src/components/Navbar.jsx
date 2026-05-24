import { Link, useNavigate } from "react-router-dom";

import { ShoppingCart, PackageCheck, LogOut, User } from "lucide-react";

import { useContext } from "react";

import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  //   const token = localStorage.getItem("token");

    const handleLogout = () => {
      localStorage.removeItem("token");

      navigate("/login");

      window.location.reload();
    };

  const {cartItems,isLoggedIn} = useContext(AppContext);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}

        <Link to="/">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            SmartCart
          </h1>
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-8 text-[15px] font-medium text-slate-700">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/orders"
                className="hover:text-black transition flex items-center gap-2"
              >
                <PackageCheck size={18} />
                Orders
              </Link>

              <Link
                to="/cart"
                className="relative hover:text-black transition flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Cart
                <span className="absolute -top-3 -right-4 bg-black text-white text-xs h-5 w-5 rounded-full flex justify-center items-center">
                  {cartItems.length}
                </span>
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-black text-white px-5 py-2 rounded-xl hover:bg-slate-800 transition flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-black transition">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white px-5 py-2 rounded-xl hover:bg-slate-800 transition flex items-center gap-2"
              >
                <User size={18} />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
