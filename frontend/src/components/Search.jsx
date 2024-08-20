import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (search?.trim()) {
      navigate(`/products/?keyword=${search}`);
    }
  };

  return (
    <>
      <div className=" w-[170px]  md:w-[170px] rounded-[20px] md:px-2 bg-gray-200 lg:w-[200px] h-[35px] flex items-center  ">
        <input
          className=" px-2 py-1 md:block w-[85%] text-[18px] outline-none border-none bg-transparent "
          type="text"
          value={search}
          onChange={handleChange}
        />
        <IoIosSearch onClick={handleSubmit} className="mt-1" />
      </div>
    </>
  );
}

export default Search;
