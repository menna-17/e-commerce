import React from "react";
import styles from "./Navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../Context/LanguageContext";
import { useCart } from "../../Context/CartContext";

const categoryMap = {
  jewelry: "Jewelry",
  crochet: "Crochet",
  candles: "Candles",
  ceramic: "Ceramics",
  "home essentials": "Home Essential"
};

const Navbar = () => {
  const { language, changeLanguage } = useLanguage();
  const { cart } = useCart();
  const cartCount = cart.length;
  const navigate = useNavigate();

  const handleCategoryNavigation = (categoryName) => {
    const key = categoryName.toLowerCase();
    const backendCategory = categoryMap[key] || categoryName;
    navigate(`/category-products?category=${encodeURIComponent(backendCategory)}`);
  };

  return (
    <header className={styles.mainNavbar}>
      {/* Top Navbar */}
      <div className={`${styles.topNavbar} py-2 position-relative`}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className={styles.logo}>
            <Link to="/" className={`${styles.topNavbarBrandHover}`}>
              <img src="/logo.jpg" alt="LocalMarket Logo" className={styles.logoImage} />
            </Link>
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* Cart */}
            <Link
              to="/cart"
              className={`${styles.cartIcon} ${styles.cartIconHover} position-relative`}
            >
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link to="/login" className={`${styles.topNavbarLink} ${styles.topNavbarLinkHover} nav-link`}>
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </Link>

            {/* Signup */}
            <Link to="/signup" className={`${styles.topNavbarLink} ${styles.topNavbarLinkHover} nav-link`}>
              {language === "ar" ? "التسجيل" : "Register"}
            </Link>

            {/* Dashboard Dropdown */}
            <div className="dropdown">
              <button
                className={`${styles.dashboardBtn} btn btn-sm dropdown-toggle ${styles.dashboardBtnHover} ${styles.dashboardBtnFocus}`}
                type="button"
                id="dashboardDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {language === "ar" ? "لوحة التحكم" : "Dashboard"}
              </button>
              <ul className={`${styles.dropdownMenu} dropdown-menu dropdown-menu-end`}>
                <li>
                  <Link to="/dashboard" className={`${styles.dropdownMenuItem} ${styles.dropdownMenuItemHover} dropdown-item`}>
                    {language === "ar" ? "الرئيسية" : "Main"}
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-users" className={`${styles.dropdownMenuItem} ${styles.dropdownMenuItemHover} dropdown-item`}>
                    {language === "ar" ? "إدارة المستخدمين" : "Manage Users"}
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/edit-products" className={`${styles.dropdownMenuItem} ${styles.dropdownMenuItemHover} dropdown-item`}>
                    {language === "ar" ? "تعديل المنتجات" : "Edit Products"}
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/orders" className={`${styles.dropdownMenuItem} ${styles.dropdownMenuItemHover} dropdown-item`}>
                    {language === "ar" ? "الطلبات" : "Orders"}
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/products" className={`${styles.dropdownMenuItem} ${styles.dropdownMenuItemHover} dropdown-item`}>
                    {language === "ar" ? "إدارة المنتجات" : "Admin Products"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Language Selector */}
            <div className="lang-select-wrapper">
              <select
                className={`${styles.langSelector} form-select form-select-sm ${styles.langSelectorHover} ${styles.langSelectorFocus}`}
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
      <nav className={`navbar navbar-expand-lg ${styles.bottomNavbar}`}>
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bottomNavbar"
            aria-controls="bottomNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="bottomNavbar">
            <ul className={`${styles.bottomNavbarNav} navbar-nav me-auto mb-2 mb-lg-0`}>
              <li className={`${styles.bottomNavbarNavItem} nav-item`}>
                <Link to="/" className={`${styles.navLink} ${styles.navLinkHover} nav-link`}>
                  {language === "ar" ? "الرئيسية" : "Home"}
                </Link>
              </li>

              {/* Products Dropdown */}
              <li className={`${styles.bottomNavbarNavItem} nav-item dropdown ${styles.dropdownNav}`}>
                <span
                  className={`${styles.navLink} ${styles.navLinkHover} nav-link dropdown-toggle`}
                  id="productsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/product-list");

                    // Manually close the dropdown
                    const dropdown = document.getElementById("productsDropdown");
                    const parentLi = dropdown?.closest("li.dropdown");
                    parentLi?.classList.remove("show");

                    const menu = parentLi?.querySelector(".dropdown-menu");
                    menu?.classList.remove("show");
                  }}
                >
                  {language === "ar" ? "المنتجات" : "Products"}
                </span>

                <ul className={`${styles.productNavDropdown} dropdown-menu`} aria-labelledby="productsDropdown">
                  {[
                    { key: "jewelry", labelEn: "Jewelry", labelAr: "إكسسوارات" },
                    { key: "candles", labelEn: "Candles", labelAr: "شموع" },
                    { key: "crochet", labelEn: "Crochet", labelAr: "كروشيه" },
                    { key: "ceramic", labelEn: "Ceramics", labelAr: "سيراميك" },
                    {
                      key: "home essentials",
                      labelEn: "Home Essentials",
                      labelAr: "الاحتياجات المنزلية",
                    },
                  ].map(({ key, labelEn, labelAr }) => (
                    <li key={key}>
                      <button
                        type="button"
                        className={`${styles.productNavDropdownItem} ${styles.productNavDropdownItemHover} dropdown-item`}
                        onClick={() => handleCategoryNavigation(labelEn)}
                      >
                        {language === "ar" ? labelAr : labelEn}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>

              <li className={`${styles.bottomNavbarNavItem} nav-item`}>
                <Link to="/offers" className={`${styles.navLink} ${styles.navLinkHover} nav-link`}>
                  {language === "ar" ? "العروض" : "Offers"}
                </Link>
              </li>

              <li className={`${styles.bottomNavbarNavItem} nav-item`}>
                <Link to="/contact" className={`${styles.navLink} ${styles.navLinkHover} nav-link`}>
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
