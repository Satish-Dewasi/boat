import React, { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { BsHandbag } from "react-icons/bs";
import { Link, NavLink, useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { BsDash } from "react-icons/bs";
import { IoChevronForwardOutline } from "react-icons/io5";

function Navbar() {
  const [isActive, setActive] = useState(false);

  const toggleNavbar = () => {
    setActive((prev) => !prev);
  };

  const [viewCategories, setViewCategories] = useState(false);
  const [viewMore, setViewMore] = useState(false);

  const [expandMoboCategories, setExpandMoboCategories] = useState(false);
  const [expandMoboMore, setExpandMoboMore] = useState(false);

  const categories = [
    {
      id: 1,
      name : "earbuds",
      url : "../images/categories/earbuds.png"
    },

    {
      id: 2,
      name : "speakers",
      url : "../images/categories/speakers.png"
    },

    {
      id: 3,
      name : "party-speakers",
      url : "../images/categories/party-speakers.png"
    },

    {
      id: 4,
      name : "wired-headphones",
      url : "../images/categories/wired-headphones.png"
    },

    {
      id: 5,
      name : "wireless-headphones",
      url : "../images/categories/wireless-headphones.png"
    },

    {
      id: 6,
      name : "neckbands",
      url : "../images/categories/neckbands.png"
    },
    {
      id: 7,
      name : "gaming-headphones",
      url : "../images/categories/gaming-headphones.png"
    },
    {
      id: 8,
      name : "wired-earphones",
      url : "../images/categories/wired-earphones.png"
    },


  ];

  const replaceDashesWithSpaces = (str) => {
    return str.replace(/-/g, " ");
  };

  //closing category dropdown on route change
  const routeName = useParams();

  return (
    <>
      <nav className="w-full  fixed top-0 z-50  bg-white h-[8vh] md:h-[10vh] shadow-md border  flex items-center justify-between px-2 sm:px-5">
        <div className="flex items-center h-full gap-10">
          <div className="flex h-full gap-2 items-center ">
            {isActive ? (
              <IoCloseSharp
                className=" lg:hidden md:hidden mt-1 "
                onClick={toggleNavbar}
                size={26}
              />
            ) : (
              <LuMenu
                className=" lg:hidden md:hidden mt-1 "
                onClick={toggleNavbar}
                size={26}
              />
            )}

            <h1 className=" w-1/5  text-slate-800 font-sans text-[25px] md:text-[28px] lg:text-[32px] xl:text-[35px] tracking-wide font-500 ">
              bo<span className="text-[#ff5631] font-bold  ">A</span>t
            </h1>
          </div>

          <ul
            className={
              "list-none h-full  hidden md:flex gap-7 md:gap-8 lg:gap-10  items-center font-roboto font-[400] text-[16px] lg:text-[18px] "
            }
          >
            <li
              className="h-full flex items-center relative"
              onMouseEnter={() => setViewCategories(true)}
              onMouseLeave={() => setViewCategories(false)}
            >
              <NavLink className="flex items-center gap-1">
                Categories <IoChevronDown className="mt-[6px] " />
              </NavLink>
              {viewCategories && (
                <div className="w-[80vw] z-[999999]  p-3 py-8  h-[350px] absolute  rounded-sm grid grid-cols-3 gap-8 top-[9.8vh] border-t border-black shadow-lg bg-white ">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/product/${category.name}`}
                      className=" flex gap-3 font-sans text-[18px] "
                    >
                      <div
                        style={{
                          backgroundImage: `url(${category.url})`,
                        }}
                        className="w-1/5 bg-no-repeat bg-cover bg-top  "
                      ></div>
                      <span className="capitalize h-full flex items-center ">
                        {replaceDashesWithSpaces(category.name)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <NavLink to="/">boAt Personalisation</NavLink>
            </li>

            <li>
              <NavLink to="/">Gift with boAt</NavLink>
            </li>

            <li>
              <NavLink to="/">Corporate Orders</NavLink>
            </li>

            <li
              className="h-full flex items-center relative"
              onMouseEnter={() => setViewMore(true)}
              onMouseLeave={() => setViewMore(false)}
            >
              <NavLink className="flex items-center gap-1" to="">
                More <IoChevronDown className="mt-[6px] " />
              </NavLink>
              {viewMore && (
                <div className="w-[160px] h-[200px] absolute p-3 rounded-sm flex flex-col items-center justify-evenly top-[9.8vh] border-t border-black shadow-lg bg-white ">
                  <NavLink className={"w-full hover:bg-slate-300 "} to="/">
                    Blogs
                  </NavLink>
                  <NavLink className={"w-full hover:bg-slate-300 "} to="/">
                    About
                  </NavLink>
                  <NavLink className={"w-full hover:bg-slate-300 "} to="/">
                    Contact
                  </NavLink>
                  <NavLink className={"w-full hover:bg-slate-300 "} to="/">
                    Privacy
                  </NavLink>
                </div>
              )}
            </li>
          </ul>
        </div>

        <div className="flex gap-3 items-center  text-[22px]  ">
          <div className="w-fit md:w-[170px] md:rounded-[20px] md:px-2 md:bg-gray-200 lg:w-[200px] h-[35px] flex items-center  ">
            <input
              className="hidden md:block w-[85%] text-[18px] outline-none border-none bg-transparent "
              type="text"
            />
            <IoIosSearch className="mt-1" />
          </div>
          <BsHandbag />
          <GoPerson />
        </div>
      </nav>

      {/* Mobile  */}

      <div
        className={`fixed w-full min-h-screen top-[8vh] left-0 z-[999999] flex flex-col items-center pt-10 transition-transform duration-700 ${
          isActive ? "transform translate-x-0" : "transform -translate-x-full"
        } bg-white overflow-auto`}
        style={{ height: "calc(100vh - 8vh)" }} // Adjust height based on your requirements
      >
        <div
          className={`w-5/6 min-h-[50px] h-auto flex flex-col rounded-md ${
            expandMoboCategories ? "bg-gray-100" : ""
          }`}
        >
          <span
            onClick={() => setExpandMoboCategories((prev) => !prev)}
            className={`w-full h-[50px] p-2 flex justify-between items-center font-sans text-[19px] font-bold ${
              expandMoboCategories ? "bg-gray-200" : ""
            }`}
          >
            <p>Categories</p>
            {expandMoboCategories ? <BsDash size={25} /> : <BsPlus size={25} />}
          </span>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              expandMoboCategories
                ? "max-h-[530px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="w-full h-auto grid grid-cols-3 px-2 gap-4 py-8">
              {/* Content */}
              {categories.map((category) => (
                <Link
                  to={`/product/${category.name}`}
                  key={category.name}
                  className="h-[150px] flex flex-col text-center text-[16px] font-sans gap-2"
                >
                  <div
                    style={{
                      backgroundImage: `url(${category.url})`,
                    }}
                    className="h-[70%] w-full  bg-no-repeat bg-cover bg-center"
                  ></div>
                  <p className="capitalize">
                    {replaceDashesWithSpaces(category.name)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Other categories */}
        <div className="w-5/6 min-h-[50px] h-auto flex flex-col rounded-md">
          <span className="w-full h-[50px] p-2 flex justify-between items-center font-sans text-[19px] font-bold">
            <p>boAt Personalisation</p>
            <IoChevronForwardOutline />
          </span>
        </div>
        <div className="w-5/6 min-h-[50px] h-auto flex flex-col rounded-md">
          <span className="w-full h-[50px] p-2 flex justify-between items-center font-sans text-[19px] font-bold">
            <p>Gift with boAt</p>
            <IoChevronForwardOutline />
          </span>
        </div>
        <div className="w-5/6 min-h-[50px] h-auto flex flex-col rounded-md">
          <span className="w-full h-[50px] p-2 flex justify-between items-center font-sans text-[19px] font-bold">
            <p>Corporate Orders</p>
            <IoChevronForwardOutline />
          </span>
        </div>

        <div
          className={`w-5/6 min-h-[50px] h-auto flex flex-col rounded-md ${
            expandMoboMore ? "bg-gray-100" : ""
          }`}
        >
          <span
            onClick={() => setExpandMoboMore((prev) => !prev)}
            className={`w-full h-[50px] p-2 flex justify-between items-center font-sans text-[19px] font-bold ${
              expandMoboMore ? "bg-gray-200" : ""
            }`}
          >
            <p>Categories</p>
            {expandMoboMore ? <BsDash size={25} /> : <BsPlus size={25} />}
          </span>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              expandMoboMore ? "max-h-[530px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="w-full h-auto grid grid-cols-1 px-2 gap-2 py-4">
              {/* Content */}
              {["Lorem.", "Tenetur?", "In!", "Beatae!", "Dicta."].map(
                (text, i) => (
                  <p key={i}>{text}</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
