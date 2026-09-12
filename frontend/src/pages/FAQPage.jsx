import { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/style";
import Footer from "../components/Layout/Footer";
const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5}/>
      <Faq />
      <Footer />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? 0 : tab);
  };

  const faqs = [
    {
      id: 1,
      question: "How do I track my order?",
      answer:
        "We typically process and ship orders in 1-2 business days. Depending on your location, it can take additional 2-7 days for your order to arrive.",
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer:
        "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at support@myecommercestore.com with your order number and a brief explanation of why you're returning the item.",
    },
    {
      id: 3,
      question: "How do I track my order?",
      answer:
        "You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on our website and viewing the order details.",
    },
    {
      id: 4,
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support team by emailing us at support@myecommercestore.com, or by calling us at (555) 123-4567 between the hours of 9am and 5pm EST, Monday through Friday.",
    },
    {
      id: 5,
      question: "Can I change or cancel my order?",
      answer:
        "Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery.",
    },
    {
      id: 6,
      question: "Do you offer international shipping?",
      answer:
        "Currently, we only offer shipping within the United States.",
    },
    {
      id: 7,
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, Mastercard, PayPal, and cash on delivery.",
    },
  ];

 return (
  <div className="w-[90%] max-w-6xl mx-auto my-10">
    <h2 className="text-3xl font-bold text-gray-900 mb-8">
      FAQ
    </h2>

    <div className="w-full">
      {faqs.map((faq, index) => (
        <div key={faq.id} className="w-full">
          
          {/* FAQ QUESTION */}
          <button
            type="button"
            onClick={() => toggleTab(faq.id)}
            className="flex items-center justify-between w-full py-6 text-left"
          >
            <span className="text-lg font-medium text-gray-900">
              {faq.question}
            </span>

            <span className="text-3xl font-light text-gray-500 leading-none ml-4">
              {activeTab === faq.id ? "×" : "›"}
            </span>
          </button>

          {/* FAQ ANSWER */}
          {activeTab === faq.id && (
            <div className="pb-6 pr-12">
              <p className="text-base text-gray-500 leading-7">
                {faq.answer}
              </p>
            </div>
          )}

          {/* SEPARATOR LINE */}
          {index < faqs.length - 1 && (
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#e5e7eb",
              }}
            />
          )}

        </div>
      ))}
    </div>
  </div>
);
};
export default FAQPage;