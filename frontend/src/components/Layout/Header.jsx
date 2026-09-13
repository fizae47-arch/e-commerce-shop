import { useState, useEffect, useRef } from "react";
import styles from "../../styles/style.js";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpeg";
import { categoriesData } from "../../static/data.jsx";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "../Layout/DropDown.jsx";
import Navbar from "../Layout/Navbar.jsx";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.products); // ✅ real products ab yahan se

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);

  const searchRef = useRef(null); // ✅ click-outside detect karne k liye

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchData([]);
      return;
    }

    const filteredProducts = (allProducts || []).filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  const closeSearch = () => {
    setSearchTerm("");
    setSearchData([]);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ bahar click karne pe search dropdown close ho jaye
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchData([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top bar with logo, search, seller button */}
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-auto object-contain ml-4"
              />
            </Link>
          </div>

          {/* search box */}
          <div className="w-[50%] relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleChange}
              className="h-[40px] w-full px-2 border-[#3957] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

            {searchData && searchData.length > 0 && (
              <div className="absolute min-h-[30vh] bg-white shadow-sm-2 z-[9] p-4 w-full">
                {searchData.map((i, index) => {
                  const product_name = i.name.replace(/\s+/g, "-");
                  return (
                    <Link
                      to={`/product/${i._id}`}
                      key={index}
                      onClick={closeSearch} // ✅ select karte hi close
                    >
                      <div className="w-full flex items-start py-3">
                        <img
                          src={i.images && i.images[0]?.url}
                          alt={i.name}
                          className="h-[40px] w-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className={`${styles.button} !rounded-[8px] h-[40px]`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Dashboard" : "Dashboard"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Green navigation bar */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden 800px:flex items-center w-full bg-[#4b4f23] h-[70px]`}
      >
        <div className={`${styles.section} flex items-center justify-between`}>
          {/* Categories left, fixed size */}
          <div className="relative h-[60px] w-[270px] hidden 1000px:block flex-shrink-0">
            <BiMenuAltLeft
              size={30}
              className="absolute left-2 top-3 text-white"
            />
            <button
              className="h-[100%] w-full flex items-center justify-between pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            >
              All Categories
            </button>
            <IoIosArrowDown
              size={20}
              className="absolute right-2 top-4 pointer-events-none"
            />
            {dropDown && (
              <div className="absolute top-full left-0 w-full">
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              </div>
            )}
          </div>

          {/* Navbar aligned right under Seller button */}
          <div className="ml-auto flex items-center">
            <Navbar active={activeHeading} />
          </div>
          <div className="flex items-center">
            <div
              className="relative cursor-pointer mr-[15px]"
              onClick={() => setOpenWishList(true)}
            >
              <AiOutlineHeart
                size={30}
                style={{ color: "rgba(255,255,255,0.83)" }}
              />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                {wishlist && wishlist.length}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <div
              className="relative cursor-pointer mr-[15px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart
                size={30}
                style={{ color: "rgba(255,255,255,0.83)" }}
              />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative z-[20] cursor-pointer mr-[15px]">
              {isAuthenticated ? (
                <Link to="/profile" className="relative z-[20] block">
                  <img
                    src={user?.avatar?.url || user?.avatar}
                    className="w-[35px] h-[35px] rounded-full object-cover"
                    alt="profile"
                  />
                </Link>
              ) : (
                <Link to="/login" className="relative z-[20] block">
                  <CgProfile
                    size={30}
                    style={{ color: "rgba(255,255,255,0.83)" }}
                  />
                </Link>
              )}
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          {/* Wishlist popup */}
          {openWishList ? (
            <Wishlist setOpenWishlist={setOpenWishList} />
          ) : null}
        </div>
      </div>

      {/* mobile header responsive */}
      <div className="w-full h-[80px] fixed bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden">
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-auto object-contain ml-4"
              />
            </Link>
          </div>
          <div className="">
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* header sidebar */}
      {open && (
        <div
          className={`fixed w-full bg-[#0000005f] z-[60] h-full top-0 left-0`}
        >
          <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-[70] overflow-y-scroll">
            <div className="w-full justify-between flex pr-3">
              <div>
                <div
                  className="relative mr-[15px]"
                  onClick={() => {
                    setOpenWishList(true);
                    setOpen(false);
                  }}
                >
                  <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {wishlist && wishlist.length}
                  </span>
                </div>
              </div>
              <RxCross1
                size={30}
                className="ml-4 mt-5"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="my-8 w-[92%] m-auto h-[40px] relative">
              <input
                type="search"
                placeholder="Search Product..."
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                value={searchTerm}
                onChange={handleChange}
              />
              {searchData && searchData.length > 0 && (
                <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                  {searchData.map((i, index) => {
                    const d = i.name;
                    const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link
                        to={`/product/${i._id}`}
                        key={index}
                        onClick={() => {
                          closeSearch();
                          setOpen(false); // ✅ sidebar bhi close ho jaye
                        }}
                      >
                        <div className="flex items-center">
                          <img
                            src={i.images && i.images[0]?.url}
                            alt={i.name}
                            className="w-[50px] mr-2"
                          />
                          <h5>{i.name}</h5>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Navbar active={activeHeading} textColor="text-gray-800" layout="column" />
            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
              <Link to="/shop-create">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
            <br />
            <br />
            <br />

            <div className="flex w-full justify-center">
              {isAuthenticated ? (
                <div>
                  <Link to="/profile">
                    <img
                      src={user?.avatar?.url || user?.avatar}
                      alt=""
                      className="w-[60px] h-[60px] rounded-full object-cover border-[3px] border-[#0eae88]"
                    />
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[18px] pr-[10px] text-[#000000b7]"
                  >
                    Login /
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-[18px] text-[#000000b7]"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;