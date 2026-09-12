import styles from '../../styles/style.js';
import { navItems } from '../../static/data.jsx';
import { Link } from 'react-router-dom';

const Navbar = ({ active, textColor = "text-white", layout = "row" }) => {
  const containerClass =
    layout === "column"
      ? "flex flex-col items-start gap-4"
      : styles.normalFlex;

  return (
    <div className={containerClass}>
      {navItems &&
        navItems.map((i, index) => (
          <Link
            key={index}
            to={i.url}
            className={`${
              active === index + 1 ? 'text-[#17dd1f]' : textColor
            } font-[500] ${layout === "column" ? "" : "px-6"} cursor-pointer`}
          >
            {i.title}
          </Link>
        ))}
    </div>
  );
};

export default Navbar;
