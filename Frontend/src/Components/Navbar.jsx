import React, { useState, useEffect } from "react";
import { assets } from "../Food Del Frontend Assets/assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoginPopUp from "./LoginPopUp";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalProductAdded,
  setLogin,
  setToken,
} from "../utils/CategorySlice";
import { isAdmin } from "../utils/userSlice";


const Navbar = () => {
  const show = useSelector((state) => state.categorySlice.showLogin);
  const isAdminvalue = useSelector((store) => store.user?.admin);
  const dispatch = useDispatch();
  const TotalProductAdded = useSelector(
    (state) => state.categorySlice.TotalProductAdded
  );
  const productAdded = useSelector((state) => state.categorySlice.productAdded);
  const token = useSelector((state) => state.categorySlice.token);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(getTotalProductAdded());
  }, [dispatch, productAdded]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(""));
    dispatch(isAdmin(false));
    navigate("/");
  };

  // Ensure token persistence on page reload
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  return (
    <>
      {show && <LoginPopUp />}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img
            className="h-20 w-20 md:h-35 md:w-35 object-cover"
            src="https://img.freepik.com/premium-vector/event-management-logo_105514-2.jpg"
            alt="event_logo"

          />
          <div className="hidden md:flex gap-8 items-center text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 cursor-pointer font-semibold"
                  : "text-black cursor-pointer hover:text-green-500 transition duration-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/food-menu"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 cursor-pointer font-semibold"
                  : "text-black cursor-pointer hover:text-green-500 transition duration-300"
              }
            >
              Events
            </NavLink>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 cursor-pointer font-semibold"
                  : "text-black cursor-pointer hover:text-green-500 transition duration-300"
              }
            >
              Contact Us
            </NavLink>
          </div>

          <div className="flex gap-6 items-center">

            {/* <img
              className="h-7 cursor-pointer"
              src={assets.search_icon}
              alt="Search"
            /> */}

            <div className="relative">
              <div className="flex gap-4 items-center justify-center">

                {isAdminvalue && (<button
                  onClick={() => { window.location.href = "https://algomox-final-svdz.vercel.app" }}
                  className="h-10 rounded-lg shadow-lg bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 border border-blue-700 text-md font-bold"
                >
                  create Event
                </button>)}
                <Link to="/cart">
                  <img
                    className="h-7 cursor-pointer"
                    src={assets.basket_icon}
                    alt="Basket"
                  />
                </Link>
              </div>




              {TotalProductAdded > 0 ? (
                <div className="absolute flex items-center justify-center min-w-[20px] min-h-[20px] bg-green-500 text-white font-bold rounded-full top-[-8px] right-[-8px]">
                  {TotalProductAdded}
                </div>
              ) : (
                <></>
              )}
            </div>
            {token ? (
              <div className="relative">
                <img
                  src={assets.profile_icon}
                  alt="Profile"
                  className="h-7 cursor-pointer"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                    <li
                      onClick={() => navigate("/myorders")}
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <img
                        src="https://t3.ftcdn.net/jpg/05/12/79/86/360_F_512798614_wolbwuaalLg8YOKjoalvvebzKRuwIvqq.jpg"
                        alt="Orders"
                        className="h-[20px] mr-2"
                      />
                      <span>My Events</span>
                    </li>
                    <li
                      onClick={logout}
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <img
                        src={assets.logout_icon}
                        alt="Logout"
                        className="h-6 mr-2"
                      />
                      <span>Logout</span>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <button
                onClick={() => dispatch(setLogin())}
                className="h-10 rounded-lg shadow-lg bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 border border-blue-700 text-md font-bold"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
        <div className="md:hidden flex justify-around py-4 bg-gray-100 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-green-500 cursor-pointer font-semibold"
                : "text-black cursor-pointer hover:text-green-500 transition duration-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/food-menu"
            className={({ isActive }) =>
              isActive
                ? "text-green-500 cursor-pointer font-semibold"
                : "text-black cursor-pointer hover:text-green-500 transition duration-300"
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive
                ? "text-green-500 cursor-pointer font-semibold"
                : "text-black cursor-pointer hover:text-green-500 transition duration-300"
            }
          >
            Contact Us
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
