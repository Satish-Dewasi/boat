import React from "react";
import HeroSlider from "../components/HeroSlider";
import ProductSlider from "../components/ProductSlider";
import HeroImageSlider from "../components/HeroImageSlider";
import MetaData from "../components/MetaData";

function Hero() {
  return (
    <>
      <MetaData
        title={
          "Buy Earbuds, Headphones, Earphones at India's No.1 Earwear Brand "
        }
      />
      <div className="w-full min-h-screen mt-[8vh] ">
        <HeroImageSlider />
        <div className=" w-full h-auto p-3 mt-8  flex flex-col gap-2  ">
          <h1 className=" px-1 text-2xl font-robotoMedium "> Top Picked </h1>
          <ProductSlider />
        </div>
      </div>
    </>
  );
}

export default Hero;
