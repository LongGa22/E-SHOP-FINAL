import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineDashboard,
  AiOutlineLogout,
  AiFillSetting,
  AiOutlineOrderedList,
  AiOutlineProfile,
} from "react-icons/ai";
import { PiUserList } from "react-icons/pi";
import { FaShippingFast, FaUsers, FaProductHunt } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import "boxicons";
import Home from "../Home";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
//
  // const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [isUsernameHovered, setIsUsernameHovered] = useState(false);
//
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const SidebarHandler = () => {
    let btn = document.querySelector("#btn");
    let sidebar = document.querySelector(".sidebar");

    btn.onclick = function () {
      sidebar.classList.toggle("active");
    };
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-black bg-[#fff] w-[5%] hover:w-[10%] h-[100vh]  fixed opacity-80 z-10 `}
      id="navigation-container"
    >
      
      <div className="flex flex-col justify-center space-y-4">
        
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>

        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
          <div className="absolute top-9">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem] text-red-400" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>{" "}
          <FavoritesCount />
        </Link>
      </div>

      <div className="relative" onMouseLeave={() => setIsUsernameHovered(false)}>
      <div
        onMouseEnter={() => setIsUsernameHovered(true)}
        onMouseLeave={() => setIsUsernameHovered(false)}
        className="flex items-center text-gray-800 focus:outline-none"
      >
        {/* Biểu tượng người dùng */}
        {userInfo && (
          <AiOutlineUser className="mr-2 mt-[0rem]" size={26} />
        )}
        {/* Tên người dùng chỉ hiển thị khi hover vào biểu tượng người dùng */}
        {userInfo && isUsernameHovered && (
          <span className="text-black">{userInfo.username}</span>
        )}
      </div>

      {(dropdownOpen || isUsernameHovered) && userInfo && (
        <ul
          onMouseEnter={() => setIsUsernameHovered(true)}
          onMouseLeave={() => setIsUsernameHovered(false)}
          className={`absolute left-8 mb-3  space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
        >
          {userInfo.isAdmin && (
            <>
              <li>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AiOutlineDashboard style={{ marginRight: "0.5rem" }} />
                    <p>Dashboard</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/productlist"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FaProductHunt style={{ marginRight: "0.5rem" }} />
                    <p>Products</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categorylist"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MdOutlineCategory style={{ marginRight: "0.5rem" }} />
                    <p>Category</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orderlist"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AiOutlineOrderedList style={{ marginRight: "0.5rem" }} />
                    <p>Orders</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/userlist"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PiUserList style={{ marginRight: "0.5rem" }} />
                    <p>Users</p>
                  </div>
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
              <div style={{ display: "flex", alignItems: "center" }}>
                <AiOutlineProfile style={{ marginRight: "0.5rem" }} />
                <p>Profile</p>
              </div>
            </Link>
          </li>
          <li>
            <button
              onClick={logoutHandler}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <AiOutlineLogout style={{ marginRight: "0.5rem" }} />
                <p>Logout</p>
              </div>
            </button>
          </li>
        </ul>
      )}
      {/* Các phần còn lại giữ nguyên */}
    </div>
    </div>

    // <body>
    //  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
    //   <div className="sidebar">
    //     <div className="top">
    //       <div className="logo">
    //       <p >Welcome back {userInfo.name}</p>
    //       </div>
    //       <AiOutlineMenu id="btn" className="icon" size={26}  onClick={SidebarHandler}></AiOutlineMenu>
    //     </div>

    //     <div className="user">
    //     <img src="#" alt="user-img" className="user-img" />
    //     <div>
    //       <p className="bold"> Clint B.</p>
    //       <p>Admin</p>
    //     </div>
    //     </div>
    //     <ul>
    //       <li>
    //         <a href="/">
    //         <i class='bx bx-home'></i>
    //           <span className="nav-item">Home</span>
    //         </a>
    //         <span className="tooltip">Home</span>
    //       </li>
    //       <li>
    //       <a href="/shop" >
    //       <i class='bx bx-shopping-bag'></i>
    //          <span className="nav-item">Shop</span>
    //        </a>
    //         <span className="tooltip">Shop</span>
    //       </li>
    //       <li>
    //       <a to="/dashboard">
    //       <i class='bx bx-cart-alt'></i>
    //          <span className="nav-item">Cart</span>
    //        </a>
    //         <span className="tooltip">Cart</span>
    //       </li>
    //       <li >
    //       <a href="/favorite">
    //       <i class='bx bx-heart'></i>
    //          <span className="nav-item">Favorite</span>
    //        </a>
    //         <span className="tooltip">Favorite</span>
    //         <FavoritesCount />
    //       </li>
    //       <li >
    //       <a href="/register">
    //       <i class='bx bx-user-plus'></i>
    //          <span className="nav-item">Register</span>
    //        </a>
    //         <span className="tooltip">Register</span>
    //       </li>
    //       <li >
    //       <a href="/favorite">
    //       <i class='bx bx-heart'></i>
    //          <span className="nav-item">Favorite</span>
    //        </a>
    //         <span className="tooltip">Favorite</span>
    //         <FavoritesCount />
    //       </li>

    //     </ul>

    //   </div>

    //   <div className="main-content">
    //     <div className="container">
    //       <Home></Home>

    //     </div>
    //   </div>
    // </body>
  );
};

export default Navigation;
