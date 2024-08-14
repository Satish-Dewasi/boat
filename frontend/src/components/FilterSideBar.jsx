import React, { useEffect, useState } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function FilterSideBar() {
  const [filters, setFilters] = useState([
    {
      name: "category",
      isActive: true,
    },
    {
      name: "colors",
      isActive: false,
    },
    {
      name: "price",
      isActive: false,
    },
    {
      name: "best for",
      isActive: false,
    },
    {
      name: "playback",
      isActive: false,
    },
    {
      name: "availability",
      isActive: false,
    },
  ]);

  const map = new Map();

  map.set("category", ["gaming earbuds", "true wireless earbuds"]);
  map.set("colors", ["black", "blue", "green", "red", "white"]);
  map.set("price", ["less than 500", "500-1000", "1000-2500", "2500+"]);
  map.set("best for", ["gaming", "music lovers", "sports", "treavels"]);
  map.set("playback", ["less than 20Hrs", "20-50Hrs", "50-75Hrs", "100+Hrs"]);
  map.set("availability", ["in the stocks"]);

  const [properties, setProperties] = useState(map.get("category"));

  const handleStateChange = (index, name) => {
    const newFilters = filters.map((filter, i) => ({
      ...filter,
      isActive: i === index,
    }));
    setFilters(newFilters);
    const newProperties = map.get(name);
    setProperties(newProperties);
    console.log(newProperties);
  };

  return (
    <div className="hidden  absolute left-0 h-screen w-[30%] bg-green-500 z-50 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 font-semibold text-xl w-fit rounded-md px-3 py-1">
          <IoOptionsOutline /> Filters
        </div>
        <button className="p-4">
          <IoClose size={25} className="font-bold" />
        </button>
      </div>

      {/* body */}
      <div className="w-full h-auto flex min-h-[400px] bg-red-200">
        {/* side navigation */}
        <div className="p-2 w-[40%] flex flex-col gap-1 h-[400px] bg-gray-200">
          {filters.map((filter, index) => (
            <Link
              key={filter.name}
              name={filter.name}
              onClick={() => handleStateChange(index, filter.name)}
              className={`${
                filter.isActive ? "font-bold border-l-[4px]" : ""
              } w-full h-[35px] capitalize flex items-center justify-start  px-2 rounded-lg border-green-400`}
            >
              {filter.name}
            </Link>
          ))}
        </div>

        {/* filters */}
        <div className="w-[60%] h-[400px] flex flex-col gap-2  p-2  pl-8 bg-gray-100">
          {properties.map((property) => (
            <label key={property} className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 rounded-lg"
              />
              <span className="ml-3 capitalize text-[16px] text-gray-700">
                {property}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="w-full h-[10vh] bg-red-300 flex items-center gap-10 justify-center  ">
        <button className="px-3 py-2 text-[18px] font-bold text-white uppercase transition-colors duration-300 transform bg-gray-300 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
          Clear All
        </button>

        <button className="px-3 py-2 text-[18px] font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
          Apply Filter
        </button>
      </div>
    </div>
  );
}

export default FilterSideBar;
