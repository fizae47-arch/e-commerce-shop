import React from 'react';
import styles from '../../styles/style';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className={`relative min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
    style={{
        backgroundImage: "url(https://www.hackrea.net/wp-content/uploads/2021/05/What-to-do-with-empty-space-in-the-living-room-modern-ideas-to-fill-empty-corners-cover.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }}>
       <div className={`${styles.section}  w-[90%] 800px:w[60%]`}>
       <h1 className={"text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font[600] capitalize"}>
        Best Collection for <br /> home Decoration
       </h1>
       <p className='pt-5 text[16px] font-[Poppins] font-[400] text-[black}'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates incidunt veniam placeat itaque in adipisci possimus a, quis rem. <br/> Ut laboriosam maxime odio, ratione totam earum sint ipsam sit velit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates incidunt veniam placeat <br/> itaque in adipisci possimus a, quis rem.
       </p>
       <Link to="/products" className='inline-block'>
       <div className={`${styles.button} mt-5`}>
        <span className='text-white font-Poppins text-18px'>
            Shop Now
        </span>
        </div>
        </Link>
       </div>
    </div>
  )
}

export default Hero;