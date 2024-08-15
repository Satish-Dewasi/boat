import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import { IoChevronDown } from "react-icons/io5";
import { IoOptionsOutline } from "react-icons/io5";
import { Link, NavLink, useParams } from "react-router-dom";
import { BiSortAlt2 } from "react-icons/bi";
import FilterSideBar from "../components/FilterSideBar";
import axios from "axios";

function Product() {
  const { category } = useParams();

  const replaceDashesWithSpaces = (str) => {
    return str.replace(/-/g, " ");
  };

  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/products?category=${category}`)
    .then(response  => {
      setProducts(response.data.products);

      updateMaxLength(); 
   
    })
  },[products])




  const categoryName = replaceDashesWithSpaces(category);

  const [sortMenu, setSortMenu] = useState(false);

  const [maxLength, setMaxLength] = useState(100);

  const truncateDescription = (description) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  const updateMaxLength = () => {
    const width = window.innerWidth;
    if (width < 400) {
      setMaxLength(30); 
    } else if (width < 724) {
      setMaxLength(75); 
    }
    else if (width < 1024) {
      setMaxLength(90); 
    } else {
      setMaxLength(100); 
    }
  };

  return (
    <div className="w-full min-h-screen pt-[10vh] relative ">
      <FilterSideBar />

      <h2 className="text-2xl md:text-3xl lg:text-4xl px-4 py-2 lg:py-4 capitalize font-bold font-sans ">
        {categoryName}
      </h2>

      {/* filter and sort */}
      <div className="w-full h-[10vh] flex items-center justify-between px-4  ">
        {/* filter */}
         <div className="flex items-center gap-1 font-semibold text-xl w-fit rounded-md border-2 border-gray-300 bg-gray-200 px-3 py-1  ">
          <IoOptionsOutline /> Filters <IoChevronDown className="mt-[6px] " />
     </div>

        {/* sort  */}

        <div className="h-full flex items-center relative">
          <button
            onClick={() => setSortMenu((prev) => !prev)}
            className="flex items-center gap-1 font-semibold text-xl w-fit rounded-md border-2 border-gray-300 bg-gray-200 px-3 py-1"
            to=""
          >
            <BiSortAlt2 /> Sort <IoChevronDown className="mt-[6px] " />
          </button>
          {sortMenu && (
            <div className="w-[160px] h-[200px] absolute p-3 rounded-sm flex flex-col items-center justify-evenly top-[9.8vh] border-t border-black shadow-lg bg-white ">
              <Link className={"w-full hover:bg-slate-300 "} to="/">
                Blogs
              </Link>
              <Link className={"w-full hover:bg-slate-300 "} to="/">
                About
              </Link>
              <Link className={"w-full hover:bg-slate-300 "} to="/">
                Contact
              </Link>
              <Link className={"w-full hover:bg-slate-300 "} to="/">
                Privacy
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-auto p-4 bg-white grid-cols-1  grid md:grid-cols-2 xl:grid-cols-3 gap-4  ">
        {products.map((product) => (
          <Link
            to={`/product/${category}/productName`}
            key={product._id}
            className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg text-black border-2 border-gray-200"
          >
            <div
              className="w-[36%] bg-cover h-full overflow-hidden  "
              style={{
                backgroundImage:
                  `url(${product.images[1].url})`,
              }}
            ></div>
            <div className="w-2/3 px-3 lg:px-4 pt-1 pb-3 lg:pb-4  md:px-4">
              {/* rating and reviews */}
              <div className="flex text-black mt-2 item-center">
                <div className="flex items-center gap-1 font-sans text-[0.7rem] xl:text-[0.9rem] md:text-[0.7rem] sm:text-[0.9rem] ">
                  <span className="flex items-center gap-2 px-1">
                    <FaStar className=" text-orange-400 " />
                    <p className="font-semibold"> {product.ratings} </p>
                  </span>
                  <span className="border-l border-gray-500 flex px-1 items-center gap-2">
                    <p>{product.reviews.length}</p>
                    <GrValidate className="text-blue-500" />
                  </span>
                </div>
              </div>

              {/* product title  */}
              <h1 className="text-[16px] font-robotoMedium md:text-[19px] xl:text-xl  font-bold text-gray-800 "> 
              {product.name} </h1>
              <p className="mt-2 font-robotoRegular text-sm text-gray-600 ">
                {truncateDescription(product.description)}
              </p>

              {/* price and add to card button  */}
              <div className="flex justify-between font-robotoMedium mt-3 item-center">
                <h1 className="text-lg font-bold text-gray-700  md:text-xl">
                  {"$"+ product.price}
                </h1>
                <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Product;
