import { useEffect, useState } from "react";
import styles from "../../styles/style";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useSelector } from "react-redux";

const SuggesetedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (data && allProducts) {
      const d = allProducts.filter((i) => i.category === data.category);
      setRelatedProducts(d);
    }
  }, [data, allProducts]);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {relatedProducts &&
              relatedProducts.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggesetedProduct;
