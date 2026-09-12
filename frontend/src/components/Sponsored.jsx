import styles from '../styles/style';

const Sponsored = () => {
  return (
    <div className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-10 cursor-pointer rounded-xl`}>
      <div className='flex items-center justify-between w-full'>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdn0kNqdrs2NZWgZ53_KJXHs1tcmn24tIAlaRZU2LyHQ&s"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/020/335/979/small/lg-lifes-good-logo-lg-lifes-good-icon-free-free-vector.jpg"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />
        <img
          src="https://images.seeklogo.com/logo-png/36/1/iphone-logo-png_seeklogo-363420.png"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />
        <img
          src="https://static.vecteezy.com/system/resources/previews/020/190/709/non_2x/microsoft-logo-microsoft-icon-free-free-vector.jpg"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />
      </div>
    </div>
  )
}

export default Sponsored;