import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadSeller, loadUser } from "../redux/actions/user.js";
import Store from "../redux/store.js";
import { useSelector } from "react-redux";

import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import ActivationPage from "../pages/ActivationPage.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import BestSellingPage from "../pages/BestSellingPage.jsx";
import EventsPage from "../pages/EventsPage.jsx";
import FAQPage from "../pages/FAQPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import PaymentPage from "../pages/PaymentPage.jsx";
import OrderSuccessPage from "../pages/OrderSuccessPage.jsx";
import ProductDetailsPage from "../pages/ProductDetailsPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import ProtectedRoute from "./ProtectedRoute.js";   // ✅ only one correct import
import ShopCreatePage from "../pages/ShopCreatePage.jsx";
import SellerActivationPage from "../pages/SellerActivationPage.jsx";
import ShopLoginPage from "../pages/ShopLoginPage.jsx";
import { ShopHomePage } from "../ShopRoutes.js";

export default function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());

    if (isSeller && seller?._id) {
      navigate(`/shop/${seller._id}`);
    }
  }, [isSeller, seller, navigate]);

  return (
    <>
      {loading || isLoading ? null : (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/activation/:activation_token" element={<ActivationPage />} />
            <Route path="/seller/activation/:activation_token" element={<SellerActivationPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order/success/:id" element={<OrderSuccessPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route path="/shop/:id" element={<ShopHomePage />} />
          </Routes>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </>
      )}
    </>
  );
}
