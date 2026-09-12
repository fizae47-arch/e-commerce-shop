import Header from '../components/Layout/Header';
import Hero from "../components/Hero/Hero.jsx"
import Categories from "../components/Categories/Categories.jsx";
import BestDeals from "../components/BestDeals/BestDeals.jsx";
import FeaturedProduct from "../components/FeaturedProduct/FeaturedProduct.jsx";
import Events from "../components/Events/Events.jsx";
import Sponsored from "../components/Sponsored.jsx";
import Footer from "../components/Layout/Footer.jsx";

export default function HomePage() {
  return (
    <div className="bg-[#faf4f4] min-h-screen">
        <Header  activeHeading={1}/>
        <Hero/>
        <Categories />
        <BestDeals/>
        <Events/>
        <FeaturedProduct/>
        <Sponsored/>
        <Footer/>
    </div>
  )
}
