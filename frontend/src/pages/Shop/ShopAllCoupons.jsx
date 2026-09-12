import DashboardHeader from './Layout/DashboardHeader.jsx'
import DashboardSideBar from './Layout/DashboardSideBar.jsx'
import AllCoupons from "./AllCoupons.jsx";

function ShopAllCoupons () {
  return (
     <div>
        <DashboardHeader />
         <div className="flex justify-between w-full">
                <div className="w-[330px]">
                  <DashboardSideBar active={9} />
                </div>
                <div className="w-full justify-center flex">
                <AllCoupons />
            </div>
              </div>
    </div>
  )
}

export default ShopAllCoupons