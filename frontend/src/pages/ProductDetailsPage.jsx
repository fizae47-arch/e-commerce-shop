import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggesetedProduct from "../components/Products/SuggesetedProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
import { getAllEvents } from "../redux/actions/event";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  // fetch real backend products and events when page loads
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllEvents());
  }, [dispatch]);

  // set product/event data when Redux updates
  useEffect(() => {
    if (eventData !== null) {
      const event = allEvents && allEvents.find((i) => i._id === id);
      setData(event || null);
    } else {
      const foundReal = allProducts && allProducts.find((i) => i._id === id);
      setData(foundReal || null);
    }
  }, [allProducts, allEvents, id, eventData]);

  return (
    <div>
      <Header />
      {data ? (
        <>
          <ProductDetails data={data} />
          {!eventData && <SuggesetedProduct data={data} />}
        </>
      ) : (
        <div className="w-full text-center py-20">
          <h2 className="text-xl font-semibold">Loading product details...</h2>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;