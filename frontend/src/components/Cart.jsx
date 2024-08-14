import React from "react";
import { CiShoppingCart } from "react-icons/ci";

function Cart() {
  const flag = false;

  return (
    <div className="absolute w-[450px] flex flex-col gap-2 items-center z-[9999] h-[100vh] right-0 bg-gray-100 shadow-md ">
      <div className="capitalize w-full flex items-center justify-between text-2xl font-bold px-4 pt-6 ">
        <span>Your Cart</span>
        <button>X</button>
      </div>

      <div className="w-[95%]  h-[80%] flex flex-col gap-4 justify-center items-center bg-green-300 ">
        {flag && (
          <>
            <CiShoppingCart size={100} />
            <span className="text-xl font-bold ">
              Your cart is feeling lonely
            </span>
            <button className="mt-8 px-4 flex items-center justify-center h-11 bg-black text-xl text-white tracking-wide font-sans rounded-lg ">
              Start Shopping
            </button>
          </>
        )}

        <div className="w-full  h-[100px] flex  px-2  bg-gray-100 border-b border-gray-400  ">
          <div className="w-1/5 h-full bg-red-400"></div>
          <div className="w-4/5 h-full px-2 py-1 flex flex-col items-start justify-evenly bg-pink-400">
            {/* name */}
            <div className="capitalize w-full flex items-center justify-between text-[17px] font-bold  ">
              <span>Your Cart</span>
              <button>X</button>
            </div>
            {/* price */}
            <h1 className="w-full text-xl font-bold text-start ">$1028</h1>

            {/* color button */}
            <button className="px-2 py-[2px] flex items-center justify-center  bg-gray-300 text-sm text-black  font-sans rounded-md ">
              Black
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
