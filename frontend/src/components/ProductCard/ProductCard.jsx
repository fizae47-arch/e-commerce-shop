import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillStar,
  AiOutlineStar,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsCards from "../ProductDetailsCards/ProductDetailsCards.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addWishlistItem, removeWishlistItem } from "../../redux/actions/wishlist";
import { addToCart } from "../../redux/reducers/cart";
import { toast } from "react-toastify";

const ProductCard = ({ data, isShop, isEvent }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const productId = data._id || data.id;

  useEffect(() => {
    const exists = wishlist.some((i) => (i._id || i.id) === productId);
    setClick(exists);
  }, [wishlist, productId]);

  const removeFromWishlistHandler = () => {
    dispatch(removeWishlistItem({ ...data, _id: productId }));
  };

  const addToWishlistHandler = () => {
    dispatch(addWishlistItem({ ...data, _id: productId }));
  };

  const addToCartHandler = () => {
    const isItemExists = cart.find((i) => (i._id || i.id) === productId);
    if (isItemExists) {
      toast.error("Item already in cart");
      return;
    }
    if (data.stock !== undefined && data.stock < 1) {
      toast.error("Product stock limited");
      return;
    }
    const cartData = { ...data, _id: productId, qty: 1 };
    dispatch(addToCart(cartData));
    toast.success("Item added to cart");
  };

  const imageUrl =
    (data.images && data.images[0]?.url) ||
    (data.image_Url && data.image_Url[0]?.url) ||
    "";
  const discountPrice = data.discountPrice ?? data.discount_price;
  const originalPrice = data.originalPrice ?? data.price;
  const soldCount = data.sold_out ?? data.total_sell ?? 0;
  const shopLink = data.shop?._id ? `/shop/preview/${data.shop._id}` : "/";

  const productLink = isEvent
    ? `/product/${productId}?isEvent=true`
    : `/product/${productId}`;

  return (
    <div className="w-full h-[370px] bg-[#f5f5f5] rounded-lg shadow-sm p-3 relative cursor-pointer">
      <Link to={productLink}>
        <img
          src={imageUrl}
          alt={data.name}
          className="w-full h-[170px] object-contain"
        />
      </Link>

      <Link to={shopLink}>
        <h5 className={`${styles.shop_name}`}>{data.shop?.name}</h5>
      </Link>

      <Link to={productLink}>
        <h4 className="pb-3 font-[500] text-[16px] h-[44px] overflow-hidden line-clamp-2">
          {data.name}
        </h4>
        <div className="flex">
          <AiFillStar size={20} color="#f68A00" />
          <AiFillStar size={20} color="#f68A00" />
          <AiFillStar size={20} color="#f68A00" />
          <AiFillStar size={20} color="#f68A00" />
          <AiOutlineStar size={20} color="#f68A00" />
        </div>
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {discountPrice}$
            </h5>
            <h4 className={`${styles.price}`}>
              {originalPrice ? originalPrice + "$" : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {soldCount} sold
          </span>
        </div>
      </Link>

      {/* side options */}
      <div className="absolute right-2 top-3 z-[1] flex flex-col items-center gap-4">
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer bg-white rounded-full p-1 shadow"
            onClick={removeFromWishlistHandler}
            color="red"
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer bg-white rounded-full p-1 shadow"
            onClick={addToWishlistHandler}
            color="#333"
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer bg-white rounded-full p-1 shadow"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer bg-white rounded-full p-1 shadow"
          onClick={addToCartHandler}
          color="#444"
          title="Add to cart"
        />
      </div>

      {open ? <ProductDetailsCards setOpen={setOpen} data={data} /> : null}
    </div>
  );
};

export default ProductCard;