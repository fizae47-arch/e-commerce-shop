import styles from "../../styles/style";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addCartItem(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 gap-6`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={`${data.images[0]?.url}`}
          alt=""
          className="w-full h-full max-h-[400px] object-cover rounded-lg"
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center px-2 lg:px-0 mt-5 lg:mt-0">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p className="text-gray-600 mt-2">{data.description}</p>
        <div className="flex py-2 items-center">
          <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
            {data.originalPrice}$
          </h5>
          <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
            {data.discountPrice}$
          </h5>
          <span className="pl-4 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <div className="flex items-center mt-5 gap-4">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff]`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;