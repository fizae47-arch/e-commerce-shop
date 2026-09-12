import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import { addCartItem, removeCartItem } from "../../redux/actions/cart";
import styles from "../../styles/style";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // ✅ Remove item by id
  const removeFromCartHandler = (id) => {
    dispatch(removeCartItem({ _id: id }));
  };

  // ✅ Safe numeric conversion
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * Number(item.discountPrice || 0),
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addCartItem(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm rounded-l-lg">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center flex-col">
            <RxCross1
              size={25}
              className="cursor-pointer absolute top-5 right-5"
              onClick={() => setOpenCart(false)}
            />
            <h5 className="text-[18px] font-[500] text-gray-600">
              Cart is empty!
            </h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>

              {/* Item count */}
              <div className={`${styles.noramlFlex} p-4 border-b`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              {/* Cart items */}
              <div className="w-full">
                {cart.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </div>
            </div>

            {/* Checkout */}
            <div className="px-5 mb-4">
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-full bg-[#e44343] rounded-[5px] hover:bg-[#c73737] transition-all">
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${totalPrice.toFixed(2)})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = Number(data.discountPrice || 0) * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      quantityChangeHandler({ ...data, qty: value + 1 });
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    quantityChangeHandler({ ...data, qty: value === 1 ? 1 : value - 1 });
  };

  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {/* Quantity controls */}
        <div className="flex items-center space-x-2">
          <div
            className="bg-[#e44343] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="text-[16px] font-[500]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-[16px] font-[500] text-gray-800">{data.name}</h1>
          <h4 className="text-[14px] text-gray-500">
            ${data.discountPrice} × {value}
          </h4>
          <h4 className="text-[16px] font-[600] text-[#d02222]">
            US${totalPrice.toFixed(2)}
          </h4>
        </div>
      </div>

      {/* Remove icon */}
      <RxCross1
        className="cursor-pointer text-gray-600 hover:text-[#e44343] transition-all"
        onClick={() => removeFromCartHandler(data._id)}
      />
    </div>
  );
};

export default Cart;
