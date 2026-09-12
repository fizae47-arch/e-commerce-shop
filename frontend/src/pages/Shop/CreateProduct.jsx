import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/actions/product";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [error, success, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Convert images to base64 for Cloudinary upload
    const imagePromises = images.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((base64Images) => {
      const productData = {
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller?._id, // ✅ safe access
        images: base64Images,
      };

      dispatch(createProduct(productData));
    });
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-slate-50 shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <label className="pb-2">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your product name..."
          className="mt-2 block w-full px-3 h-[35px] border rounded-[3px]"
        />

        {/* Description */}
        <label className="pb-2 mt-4">Description *</label>
        <textarea
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your product description..."
          className="mt-2 block w-full px-3 border rounded-[3px]"
        />

        {/* Category */}
        <label className="pb-2 mt-4">Category *</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mt-2 border h-[35px] rounded-[5px]"
        >
          <option value="">Choose a category</option>
          {categoriesData.map((i) => (
            <option key={i.title} value={i.title}>
              {i.title}
            </option>
          ))}
        </select>

        {/* Tags */}
        <label className="pb-2 mt-4">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter your product tags..."
          className="mt-2 block w-full px-3 h-[35px] border rounded-[3px]"
        />

        {/* Prices */}
        <label className="pb-2 mt-4">Original Price</label>
        <input
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          placeholder="Enter your product price..."
          className="mt-2 block w-full px-3 h-[35px] border rounded-[3px]"
        />

        <label className="pb-2 mt-4">Price (With Discount) *</label>
        <input
          type="number"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
          placeholder="Enter your product price with discount..."
          className="mt-2 block w-full px-3 h-[35px] border rounded-[3px]"
        />

        {/* Stock */}
        <label className="pb-2 mt-4">Product Stock *</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Enter your product stock..."
          className="mt-2 block w-full px-3 h-[35px] border rounded-[3px]"
        />

        {/* Images */}
        <label className="pb-2 mt-4">Upload Images *</label>
        <input
          type="file"
          id="upload"
          multiple
          className="hidden"
          onChange={handleImageChange}
        />
        <div className="flex flex-wrap items-center">
          <label htmlFor="upload">
            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
          </label>
          {images.map((i) => (
            <img
              src={URL.createObjectURL(i)}
              key={i.name}
              alt=""
              className="h-[120px] w-[120px] object-cover m-2"
            />
          ))}
        </div>

        {/* Submit */}
        <input
          type="submit"
          value="Create"
          className="mt-4 cursor-pointer block w-full px-3 h-[35px] border rounded-[3px] bg-blue-500 text-white"
        />
      </form>
    </div> 
  );
};

export default CreateProduct;
