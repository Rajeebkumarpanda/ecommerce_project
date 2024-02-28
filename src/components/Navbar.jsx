import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const result = useSelector((state) => state.product);
  console.log(result.cart)
  return (
    <div>
      <nav className="relative select-none bg-grey lg:flex lg:items-stretch w-full px-20 py-2 bg-gradient-to-r from-slate-400 to-slate-400">
        <div className="flex flex-no-shrink items-stretch h-12">
          <Link
            to={`/`}
            className="font-bold text-2xl font-mono flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark"
          >
            ECOMMERCE
          </Link>

          <button className="block lg:hidden cursor-pointer ml-auto relative w-12 h-12 p-4">
            <svg
              className="fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <svg
              className="fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
        <div className="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
          <div className="lg:flex lg:items-stretch lg:justify-end ml-auto">
            <Link
              to="/"
              className="font-semibold font-mono flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="font-semibold font-mono flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark"
            >
              Cart ({result.cart ? result.cart.length : 0})
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
