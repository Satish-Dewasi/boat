import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import Cart from "../components/Cart";

function ProductDetail() {
  const [colors, setSetColors] = useState([
    {
      name: "black",
      isActive: true,
    },
    {
      name: "white",
      isActive: false,
    },
    {
      name: "red",
      isActive: false,
    },
    {
      name: "blue",
      isActive: false,
    },
    {
      name: "purple",
      isActive: false,
    },
  ]);

  //////
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    // New image URL
  ];

  const properties = {
    prevArrow: (
      <button className="bg-gray-400 ml-2 text-white font-semibold text-xl p-1 rounded-[50%] ">
        <IoChevronBack />
      </button>
    ),
    nextArrow: (
      <button className="bg-gray-400 mr-2 text-white font-semibold text-xl p-1 rounded-[50%] ">
        <IoChevronForward />
      </button>
    ),
  };

  const indicators = (index) => (
    <div
      style={{ backgroundImage: `url(${images[index]})` }}
      className=" hidden lg:block w-[15vh] h-[12vh] mt-[-10px] bg-red-500 text-center mx-5 bg-cover bg-center  "
    ></div>
  );

  return (
    <div className="bg-pink-900 w-full h-screen pt-[10vh] flex flex-col lg:flex-row items-center gap-2  ">
      <div className="w-full lg:w-1/2 h-full flex items-center gap-2 bg-red-300 ">
        <div className=" w-full  h-[48vh] lg:h-full bg-white p-4 ">
          <div className="bg-black w-full h-full ">
            <Slide indicators={indicators} {...properties}>
              {images.map((image, index) => (
                <div key={index} className="each-slide-effect">
                  <div
                    className=" h-[45vh] lg:h-[70vh] flex items-center justify-center bg-cover "
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                  ></div>
                </div>
              ))}
            </Slide>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2  h-full p-2 px-4  bg-purple-300 ">
        <div className="bg-gray-200 flex flex-col items-start gap-2 w-full h-full ">
          <div className="flex text-black mt-2 item-center">
            {/* star and rating */}
            <div className="flex items-center gap-1 font-sans text-[0.7rem] xl:text-[0.9rem] md:text-[0.7rem] sm:text-[0.9rem] ">
              <span className="flex items-center gap-2 px-1">
                <FaStar className=" text-orange-400 " />
                <p className="font-semibold">4.8</p>
              </span>
              <span className="border-l border-gray-500 flex px-1 items-center gap-2">
                <p>1300</p>
                <GrValidate className="text-blue-500" />
              </span>
            </div>
          </div>
          {/* title */}
          <h1 className="text-2xl font-bold font-sans ">
            Lorem ipsum dolor sit amet.
          </h1>

          {/* descryption */}
          <p className="mt-2 text-sm text-gray-600 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit In oditLorem
            ipsum dolor sit amet. Lorem ipsum dolor sit amet.Lorem ipsum dolor
            sit amet.
          </p>

          {/* price */}
          <div className="flex gap-2 items-center">
            <p className=" font-sans text-2xl  ">₹1045</p>
            <p className=" font-sans text-[17px] line-through text-gray-600 ">
              ₹2325
            </p>
            <p className=" font-sans text-xl text-green-500   ">56%</p>
          </div>

          {/* colors */}
          <div className="p-2 w-full flex flex-col gap-2 h-fit bg-red-200">
            <h1 className="font-sans text-xl font-bold">
              Choose Your Color :{" "}
              <span className="text-[16px] font-[400] "> colorname </span>
            </h1>
            <div className="p-2 w-full flex flex-row gap-2 h-auto bg-purple-400">
              {colors.map((color, index) => (
                <Link
                  key={color.name}
                  name={color.name}
                  onClick={() => handleStateChange(index, color.name)}
                  className={`${
                    color.isActive ? "font-bold border-b-[2px]" : ""
                  }  capitalize flex p-1 items-center justify-start    border-yellow-600`}
                >
                  <div className="w-[35px] h-[35px] rounded-[50%] bg-red-500"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* delevery check */}
          <div className="mt-3 p-2 w-full flex flex-col gap-2 h-fit bg-red-200">
            <h1 className="font-sans text-xl font-bold">Check Delivery</h1>

            <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
              <button
                className="!absolute right-1 top-1 z-10 select-none rounded bg-black py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                type="button"
                data-ripple-light="true"
              >
                Check
              </button>
              <input
                type="text"
                className="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
                required
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-grey-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                pincode
              </label>
            </div>

            <h1 className="font-sans text-[18px] text-green-400 font-bold">
              Free delivery
              <span className=" border-l-2 border-gray-500 ml-2 pl-2 text-[16px] text-black  ">
                By Monday, 27 june
              </span>
            </h1>
          </div>

          {/* add to card */}

          <button className="mt-6  w-full flex items-center justify-center gap-2 h-11 bg-black text-xl text-white tracking-wide font-sans rounded-lg ">
            <HiOutlineShoppingBag className=" text-[22px] font-bold  " />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
