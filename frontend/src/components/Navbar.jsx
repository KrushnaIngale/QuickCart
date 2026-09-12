import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  PackageCheck,
  LogOut,
  Search,
  Menu,
  X,
  User,
} from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, isLoggedIn, setIsLoggedIn, userData } =
    useContext(AppContext);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/logo.svg"
            alt="SmartCart"
            className="w-28 md:w-32"
          />
        </Link>
        {/* <h1 className="text-3xl font-black">
          Smart<span className="text-orange-500">Cart</span>
        </h1> */}

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-gray-900 transition">
            Shop
          </Link>
          <Link to="/about" className="hover:text-gray-900 transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-gray-900 transition">
            Contact
          </Link>
        </div>

        {/* Desktop Right Icons */}
        <div className="hidden md:flex items-center gap-5">
          <button className="text-gray-500 hover:text-gray-900 transition">
            <Search size={18} />
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-gray-900 transition flex items-center gap-1.5"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-orange-600 text-white text-[10px] h-4.5 w-4.5 min-w-[18px] px-1 rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <Link
                to="/orders"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                <PackageCheck size={20} />
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition">
                  {userData?.picture ? (
                    <img
                      src={userData.picture}
                      alt="avatar"
                      className="h-8 w-8 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <User size={16} className="text-orange-600" />
                    </div>
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {userData?.email || "User"}
                    </p>
                  </div>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3 text-sm font-medium text-gray-700">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-orange-600"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-orange-600"
          >
            Shop
          </Link>
          {isLoggedIn && (
            <>
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-orange-600"
              >
                Cart{" "}
                {cartCount > 0 && (
                  <span className="ml-1 bg-orange-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-orange-600"
              >
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="block text-red-500 hover:text-red-700"
              >
                Sign out
              </button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
