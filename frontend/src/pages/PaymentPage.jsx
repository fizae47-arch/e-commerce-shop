import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Payment from "../components/Payment/Payment";
import { server } from "../server";

const PaymentPage = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    const getStripeApiKey = async () => {
      const { data } = await axios.get(`${server}/payment/stripeapikey`);
      setStripeApiKey(data.stripeApikey); // ✅ backend jaisa exact naam
    };
    getStripeApiKey();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      )}
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PaymentPage;