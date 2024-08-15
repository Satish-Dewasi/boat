import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import { GrNext, GrPrevious } from "react-icons/gr";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:3000/api/v1/products").then((response) => {
        setProducts(response.data.products);
      });
    } catch (error) {
      console.log("error in axios" + error);
    }
  }, [products]);

  const styles = {
    slideEffect: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "cover",
      height: "350px",
    },
    slideText: {
      padding: "20px",
      fontSize: "20px",
      background: "#efefef",
      textAlign: "center",
    },
  };

  const properties = {
    prevArrow: (
      <button className="hidden bg-gray-300 rounded-[50%] p-2 text-xl lg:block">
        <GrPrevious />
      </button>
    ),
    nextArrow: (
      <button className="hidden bg-gray-300 rounded-[50%] p-2 text-xl lg:block">
        <GrNext />
      </button>
    ),
  };

  const indicators = (index) => (
    <div className="  w-10 h-10 bg-red-500 text-center mx-5 ">{index + 1}</div>
  );

  const responsiveSettings = [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ];

  return (
    <>
      {products.length > 0 ? (
        <Slide responsive={responsiveSettings} {...properties}>
          {products.map((product) => (
            <div key={product._id} className="overflow-hidden h-[350px] m-2 ">
              <div className="bg-gray-100 border border-gray-400 rounded-md w-full h-full ">
                {/* card images */}
                <div
                  style={{ backgroundImage: `url(${product.images[1].url})` }}
                  className="w-full h-[70%] bg-no-repeat overflow-hidden  bg-cover bg-center   "
                ></div>

                {/* card details */}
                <div className="w-full h-[30%] border-t border-gray-400  p-1 px-2 flex flex-col justify-evenly ">
                  <div className="capitalize  w-full flex items-center justify-between text-[17px] font-bold  ">
                    <span> {product.name} </span>
                    <button className="text-sm p-3 bg-black rounded-[50%] "></button>
                  </div>
                  {/* price */}
                  <div className="flex gap-2 items-center">
                    <p className=" font-sans text-[18px]  ">
                      {"$" + product.price}
                    </p>
                    <p className=" font-sans text-[15px] line-through text-gray-600 ">
                      {"$" + Math.ceil((product.price * 130) / 100)}
                    </p>
                    <p className=" font-sans text-[17px] text-green-500   ">
                      30%
                    </p>
                  </div>

                  {/* rating and reviews */}
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-1 font-sans text-[0.7rem] xl:text-[0.9rem] md:text-[0.7rem] sm:text-[0.9rem] ">
                      <span className="flex items-center gap-2 px-1">
                        <FaStar className=" text-orange-400 " />
                        <p className="font-semibold">{product.ratings}</p>
                      </span>
                      <span className="border-l border-gray-500 flex px-1 items-center gap-2">
                        <p>{product.reviews.length}</p>
                        <GrValidate className="text-blue-500" />
                      </span>
                    </div>

                    <button className="px-3 flex items-center justify-center h-8 bg-black text-[15px] text-white font-bold font-sans rounded-lg ">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slide>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-12 h-12 mt-8 animate-spin"
          viewBox="0 0 16 16"
        >
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
          <path
            fillRule="evenodd"
            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
          />
        </svg>
      )}
    </>
  );
};

export default ProductSlider;
