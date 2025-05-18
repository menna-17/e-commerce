import React from "react";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLanguage } from "../../Context/LanguageContext";
import { useCart } from "../../Context/CartContext";

const Navbar = () => {
  const { language, changeLanguage } = useLanguage();
  const { cart } = useCart();
  const cartCount = cart.length;

  return (
    <header className="main-navbar">
      {/* Top Navbar */}
      <div className="top-navbar py-2 position-relative">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo">
            <Link to="/" className="navbar-brand fw-bold fs-4">
              LocalMarket
            </Link>
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* Cart */}
            <Link to="/cart" className="cart-icon position-relative">
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link to="/login" className="nav-link">
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </Link>

            {/* Signup */}
            <Link to="/signup" className="nav-link">
              {language === "ar" ? "التسجيل" : "Register"}
            </Link>

            {/* Dashboard Dropdown */}
            <div className="dropdown">
              <button
                className="dashboard-btn btn btn-sm dropdown-toggle"
                type="button"
                id="dashboardDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {language === "ar" ? "لوحة التحكم" : "Dashboard"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/dashboard">
                    {language === "ar" ? "الرئيسية" : "Main"}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dashboard/manage-users">
                    {language === "ar" ? "إدارة المستخدمين" : "Manage Users"}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dashboard/edit-products">
                    {language === "ar" ? "تعديل المنتجات" : "Edit Products"}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dashboard/orders">
                    {language === "ar" ? "الطلبات" : "Orders"}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dashboard/products">
                    {language === "ar" ? "إدارة المنتجات" : "Admin Products"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Language Selector */}
            <div className="lang-select-wrapper">
              <select
                className="lang-selector form-select form-select-sm"
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="en">EN</option>
                <option value="ar">AR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <nav className="navbar navbar-expand-lg bottom-navbar">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bottomNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="bottomNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  {language === "ar" ? "الرئيسية" : "Home"}
                </Link>
              </li>
              <li className="nav-item dropdown-nav">
                <Link className="nav-link" to="/product-list">
                  {language === "ar" ? "المنتجات" : "Products"}
                </Link>

                <ul className="product-nav-dropdown">
                  <li>
                    <Link className="dropdown-item" to="/product-list/jewelry">
                      {language === "ar" ? "إكسسوارات" : "Jewelry"}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product-list/candles">
                      {language === "ar" ? "شموع" : "Candles"}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product-list/crochet">
                      {language === "ar" ? "كروشيه" : "Crochet"}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product-list/ceramics">
                      {language === "ar" ? "سيراميك" : "Ceramics"}
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/offers">
                  {language === "ar" ? "العروض" : "Offers"}
                </Link>
              </li>
            
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  {language === "ar" ? "تواصل معنا" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
