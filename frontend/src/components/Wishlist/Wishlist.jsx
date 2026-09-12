import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlistItem } from "../../redux/actions/wishlist";
import { addCartItem } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeWishlistItem(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addCartItem(newData));
    dispatch(removeWishlistItem(data));
    setOpenWishlist(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-[#00000048] z-[9998]"
      onClick={() => setOpenWishlist(false)}
    >
      <div
        className="fixed top-0 right-0 h-full w-full 800px:w-[30%] bg-white flex flex-col shadow-xl z-[9999]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <AiOutlineHeart size={22} />
            <h5 className="text-[18px] font-[600]">
              My Wishlist ({wishlist ? wishlist.length : 0})
            </h5>
          </div>
          <RxCross1
            size={22}
            className="cursor-pointer hover:text-red-500 transition-all"
            onClick={() => setOpenWishlist(false)}
          />
        </div>

        {/* Body */}
        {!wishlist || wishlist.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <h5 className="text-gray-500 text-[16px] font-[500]">
              Wishlist is empty!
            </h5>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
            {wishlist.map((data, index) => (
              <WishlistSingle
                key={index}
                data={data}
                removeFromWishlistHandler={removeFromWishlistHandler}
                addToCartHandler={addToCartHandler}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const WishlistSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const totalPrice = Number(data.discountPrice || 0);

  return (
    <div className="flex items-center justify-between border rounded-lg p-3 hover:shadow-sm transition-all">
      <div className="flex-1 pr-2">
        <h1 className="font-[500] text-[15px] text-gray-800 line-clamp-1">
          {data.name}
        </h1>
        <h4 className="text-[15px] font-[600] text-[#d02222] mt-1">
          US${totalPrice.toFixed(2)}
        </h4>
      </div>

      <div className="flex items-center gap-3">
        <AiOutlineShoppingCart
          size={20}
          title="Add to cart"
          className="cursor-pointer text-gray-600 hover:text-green-600 transition-all"
          onClick={() => addToCartHandler(data)}
        />
        <AiOutlineDelete
          size={20}
          title="Remove"
          className="cursor-pointer text-gray-600 hover:text-red-500 transition-all"
          onClick={() => removeFromWishlistHandler(data)}
        />
      </div>
    </div>
  );
};

export default Wishlist;