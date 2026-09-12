
import DashboardHeader from './Layout/DashboardHeader'
import DashboardSideBar from './Layout/DashboardSideBar';
import CreateProduct from "./CreateProduct.jsx";

function ShopCreateProduct() {
  return (
    <div>
        <DashboardHeader />
         <div className="flex items-center justify-between w-full">
                <div className="w-[330px]">
                  <DashboardSideBar active={4} />
                </div>
                <div className="w-full justify-center flex">
                <CreateProduct />
            </div>
              </div>
    </div>
  )
}

export default ShopCreateProduct