import { useEffect } from "react";

/* Packages */
import { Link } from "react-router-dom";

/* Style */
import { ReactComponent as LogoIcon } from "../../assets/logo.svg";

const Navbar = () => {
  return (
    <header className="w-full bg-dark-blue flex justify-center">
      <div className="w-full flex items-center justify-between max-w-full md:max-w-6xl px-4 md:px-6 py-8 mx-auto md:flex-row">
        <Link to="/" relative="path">
          <LogoIcon />
        </Link>
      </div>
    </header>
  );
};

export { Navbar };
