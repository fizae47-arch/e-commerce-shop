import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Layout/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";
import styles from "../../styles/style";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const [value, setValue] = useState("");

  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch(() => setIsLoading(false));
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    axios.delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then(() => {
        toast.success("Coupon code deleted successfully!");
        setCoupons(coupons.filter(c => c._id !== id));
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      `${server}/coupon/create-coupon-code`,
      {
        name,
        minAmount: Number(minAmount),
        maxAmount: Number(maxAmount),
        selectedProducts,
        value, // ✅ can be number or string
        shopId: seller._id,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Coupon code created successfully!");
      setOpen(false);
      setCoupons([...coupons, res.data.couponCode]);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Coupon Code", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Value", minWidth: 100, flex: 0.6 },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows = coupons.map((item) => ({
    id: item._id,
    name: item.name,
    price: item.value + " %",
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>

          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />

          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center overflow-y-auto">
              <div className="w-[90%] 800px:w-[40%] bg-white rounded-md shadow p-6">
                <div className="w-full flex justify-end">
                  <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpen(false)} />
                </div>

                <h5 className="text-[30px] font-Poppins text-center mb-4">Create Coupon Code</h5>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="pb-2">Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter coupon name..."
                      className="mt-2 block w-full px-3 h-[35px] border rounded-[3px]"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="pb-2">Discount Value <span className="text-red-500">*</span></label>
                    <input
                      type="text" // ✅ allows characters like "10%" or "FLAT10"
                      required
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter discount (e.g. 10% or FLAT10)"
                      className="mt-2 block w-full px-3 h-[35px] border rounded-[3px]"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="pb-2">Min Amount</label>
                    <input
                      type="number"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Enter min amount..."
                      className="mt-2 block w-full px-3 h-[35px] border rounded-[3px]"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="pb-2">Max Amount</label>
                    <input
                      type="number"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter max amount..."
                      className="mt-2 block w-full px-3 h-[35px] border rounded-[3px]"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="pb-2">Selected Product</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="">Choose a product</option>
                      {products && products.map((i) => (
                        <option value={i._id} key={i._id}>{i.name}</option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="submit"
                    value="Create"
                    className="mt-4 w-full bg-[#3b82f6] text-white font-semibold py-2 rounded-md cursor-pointer hover:bg-[#2563eb] transition-all duration-200"
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
