import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/Shop/shopLogin.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux"; 

function ShopLoginPage() {
   const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true ){
      navigate(`/dashboard`)
    }
  }, [isLoading, isSeller])
  return (
    <div>
        <ShopLogin />
    </div>
  )
}

export default ShopLoginPage