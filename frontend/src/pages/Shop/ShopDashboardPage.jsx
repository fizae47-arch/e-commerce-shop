import DashboardHero from "./DashboardHero.jsx";
import DashboardHeader from "./Layout/DashboardHeader.jsx";
import DashboardSideBar from "./Layout/DashboardSideBar.jsx";

function ShopDashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        <DashboardHero />
      </div>
    </div>
  );
}

export default ShopDashboardPage;
