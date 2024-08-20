import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Cart from "../components/Cart";
import { useGetProductsDetailsQuery } from "../redux/api/productApi";

function ProductDetail() {
  const [colors, setColors] = useState([
    {
      name: "bg-black",
      isActive: true,
    },
    {
      name: "bg-gray-200",
      isActive: false,
    },
    {
      name: "bg-red-500",
      isActive: false,
    },
    {
      name: "bg-blue-500",
      isActive: false,
    },
    {
      name: "bg-purple-500",
      isActive: false,
    },
  ]);

  const properties = {
    prevArrow: (
      <button className="bg-gray-400 ml-2 text-white font-semibold text-xl p-1 rounded-[50%]">
        <IoChevronBack />
      </button>
    ),
    nextArrow: (
      <button className="bg-gray-400 mr-2 text-white font-semibold text-xl p-1 rounded-[50%]">
        <IoChevronForward />
      </button>
    ),
  };

  const indicators = (index) => {
    return (
      <div
        style={{ backgroundImage: `url(${product.images[index].url})` }}
        className="hidden md:block w-[12vh] h-[9vh] lg:w-[15vh] lg:h-[12vh]  xl:mx-5  lg:mx-3   bg-cover bg-center"
      ></div>
    );
  };

  const [product, setProduct] = useState({});
  const param = useParams();

  const { data, isLoading, error, isError } = useGetProductsDetailsQuery(
    param.id
  );

  useEffect(() => {
    if (!isLoading && !isError) {
      setProduct(data.product);
    }
  }, [data, isLoading, isError]);

  const handleStateChange = (index, name) => {
    setColors((prevColors) =>
      prevColors.map((color, i) => ({
        ...color,
        isActive: i === index,
      }))
    );
  };

  if (isLoading) {
    return (
      <div className="font-robotoMedium text-2xl w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="font-robotoMedium text-2xl w-full h-screen flex items-center justify-center">
        Error loading product details.
      </div>
    );
  }

  return (
    <div className="w-full h-screen pt-[10vh] flex flex-col lg:flex-row items-center gap-2">
      <div className="w-full lg:w-1/2 h-full flex items-center gap-2 ">
        <div className="w-full h-[48vh] lg:h-full bg-white p-4">
          <div className=" w-full h-full">
            <Slide indicators={indicators} {...properties}>
              {product.images?.map((image) => (
                <div key={image._id} className="each-slide-effect">
                  <div
                    className="h-[45vh]  lg:h-[70vh] flex items-center  justify-center bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${image.url})`,
                    }}
                  ></div>
                </div>
              ))}
            </Slide>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-full p-2 px-4 ">
        <div className=" flex flex-col items-start gap-2 w-full h-full">
          <div className="flex text-black mt-2 item-center">
            <div className="flex items-center gap-1 font-sans text-[0.7rem] xl:text-[0.9rem] md:text-[0.7rem] sm:text-[0.9rem]">
              <span className="flex items-center gap-2 px-1">
                <FaStar className="text-orange-400" />
                <p className="font-semibold">{product.ratings}</p>
              </span>
              <span className="border-l border-gray-500 flex px-1 items-center gap-2">
                <p>{product?.reviews?.length}</p>
                <GrValidate className="text-blue-500" />
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-bold font-sans">{product.name}</h1>
          <p className="mt-2 text-sm text-gray-600">{product.description}</p>

          <div className="flex gap-2 items-center">
            <p className="font-sans text-2xl">{"$" + product.price}</p>
            <p className="font-sans text-[17px] line-through text-gray-600">
              {"$" + Math.ceil((product.price * 130) / 100)}
            </p>
            <p className="font-sans text-xl text-green-500">30%</p>
          </div>

          <div className="p-2 w-full flex flex-col gap-2 h-fit ">
            <h1 className="font-sans text-xl font-bold">
              Choose Your Color:{" "}
              <span className="text-[16px] font-[400]">{product.color}</span>
            </h1>
            <div className="p-2 w-full flex flex-row gap-2 h-auto ">
              {colors.map((color, index) => (
                <Link
                  key={color.name}
                  name={color.name}
                  onClick={() => handleStateChange(index, color.name)}
                  className={`${
                    color.isActive ? "font-bold border-b-[2px]" : ""
                  } capitalize flex p-1 items-center justify-start border-yellow-600`}
                >
                  <div
                    className={`w-[35px] h-[35px] rounded-[50%] ${color.name}`}
                  ></div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-3 p-2 w-full flex flex-col gap-2 h-fit ">
            <h1 className="font-sans text-xl font-bold">Check Delivery</h1>

            <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
              <button
                className="absolute right-1 top-1 z-10 select-none rounded bg-black py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                type="button"
              >
                Check
              </button>
              <input
                type="text"
                className="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder="Enter Pincode"
                required
              />
            </div>

            <h1 className="font-sans text-[18px] text-green-400 font-bold">
              Free delivery
              <span className="border-l-2 border-gray-500 ml-2 pl-2 text-[16px] text-black">
                By Monday, 27 June
              </span>
            </h1>
          </div>

          <button className="mt-6 w-full flex items-center justify-center gap-2 h-11 bg-black text-xl text-white tracking-wide font-sans rounded-lg">
            <HiOutlineShoppingBag className="text-[22px] font-bold" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
