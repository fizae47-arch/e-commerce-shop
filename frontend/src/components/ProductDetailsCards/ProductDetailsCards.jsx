import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../../styles/style";
import { AiOutlineMessage, AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/reducers/cart";
import { addWishlistItem, removeWishlistItem } from "../../redux/actions/wishlist";

const ProductDetailsCards = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  // ✅ har product ka apna unique id
  const productId = data._id || data.id;

  const handleMessageSubmit = () => {};
  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };
  const incrementCount = () => setCount(count + 1);

  const addToCartHandler = () => {
    const isItemExists = cart.find((i) => (i._id || i.id) === productId);
    if (isItemExists) {
      toast.error("Item already in cart");
    } else if (data.stock < count) {
      toast.error("Product stock limited");
    } else {
      const cartData = { ...data, _id: productId, qty: count };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart");
    }
  };

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

  // Support both real backend product fields and old static/demo data fields
  const imageUrl =
    (data?.images && data.images[0]?.url) ||
    (data?.image_Url && data.image_Url[0]?.url) ||
    "";
  const shopAvatar = data?.shop?.avatar?.url || data?.shop?.shop_avatar?.url || "";
  const discountPrice = data?.discountPrice ?? data?.discount_price;
  const originalPrice = data?.originalPrice ?? data?.price;
  const soldCount = data?.sold_out ?? data?.total_sell ?? 0;
  const shopLink = data?.shop?._id ? `/shop/preview/${data.shop._id}` : "/";

  return (
    <div className="bg-white">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000060] z-40 flex items-center justify-center px-3">
          <div className="w-full 800px:w-[65%] max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg relative p-5">
            <RxCross1
              size={26}
              className="absolute right-4 top-4 z-50 cursor-pointer text-gray-500 hover:text-black transition"
              onClick={() => setOpen(false)}
            />

            <div className="w-full 800px:flex gap-8">
              {/* LEFT: image + shop info */}
              <div className="w-full 800px:w-[42%] flex-shrink-0">
                <div className="w-full h-[260px] bg-[#f5f5f5] rounded-md flex items-center justify-center overflow-hidden">
                  <img
                    src={imageUrl}
                    alt=""
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <Link to={shopLink} className="flex items-center mt-4">
                  <img
                    src={shopAvatar}
                    alt=""
                    className="w-[45px] h-[45px] rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h3 className={`${styles.shop_name} leading-tight`}>
                      {data.shop?.name}
                    </h3>
                    <p className="text-[13px] text-gray-500">
                      ({data.shop?.ratings || 0}) Ratings
                    </p>
                  </div>
                </Link>

                <button
                  className={`${styles.button} bg-black mt-4 rounded-[4px] h-11 w-full`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center justify-center gap-2 whitespace-nowrap">
                    Send Message <AiOutlineMessage size={18} />
                  </span>
                </button>

                <p className="text-[14px] text-red-500 mt-3 font-medium">
                  ({soldCount}) sold out
                </p>
              </div>

              {/* RIGHT: details */}
              <div className="w-full 800px:w-[58%] mt-6 800px:mt-0">
                <h1 className={`${styles.productTitle} text-[22px] leading-snug`}>
                  {data.name}
                </h1>
                <p className="text-[14px] text-gray-600 mt-2 max-h-[160px] overflow-y-auto pr-2 leading-relaxed">
                  {data.description}
                </p>

                <div className="flex items-center gap-3 pt-4">
                  <h4 className="text-[22px] font-[600] text-[#333]">
                    {discountPrice}$
                  </h4>
                  {originalPrice ? (
                    <h3 className="text-[16px] text-gray-400 line-through">
                      {originalPrice}$
                    </h3>
                  ) : null}
                </div>

                <div className="flex items-center mt-8 justify-between pr-1">
                  <div className="flex items-center">
                    <button
                      className="bg-teal-500 text-white font-bold rounded-l px-4 py-2 hover:bg-teal-600 transition"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-100 text-gray-800 font-medium px-5 py-[9px] border-t border-b">
                      {count}
                    </span>
                    <button
                      className="bg-teal-500 text-white font-bold rounded-r px-4 py-2 hover:bg-teal-600 transition"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={28}
                        className="cursor-pointer"
                        onClick={removeFromWishlistHandler}
                        color="red"
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={28}
                        className="cursor-pointer"
                        onClick={addToWishlistHandler}
                        color="#333"
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                <button
                  className={`${styles.button} mt-6 rounded-[40px] h-11 w-full flex items-center justify-center gap-2`}
                  onClick={addToCartHandler}
                >
                  <span className="text-white flex items-center gap-2">
                    Add to Cart <AiOutlineShoppingCart size={18} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCards;