import DashboardMessages from "./DashboardMessages"
import DashboardHeader from "./Layout/DashboardHeader"
import DashboardSideBar from "./Layout/DashboardSideBar"

const ShopInboxPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSideBar active={8} />
      </div>
       <DashboardMessages />
    </div>
  </div>
  )
}

export default ShopInboxPage