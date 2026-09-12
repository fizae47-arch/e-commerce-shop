import DashboardHeader from './Layout/DashboardHeader'
import DashboardSideBar from './Layout/DashboardSideBar'
// import AllProducts from "./AllProducts.jsx";
import AllEvents from "./AllEvents.jsx";

function ShopAllEvents() {
  return (
     <div>
        <DashboardHeader />
         <div className="flex justify-between w-full">
                <div className="w-[330px]">
                  <DashboardSideBar active={5} />
                </div>
                <div className="w-full justify-center flex">
                <AllEvents />
            </div>
              </div>
    </div>
  )
}

export default ShopAllEvents