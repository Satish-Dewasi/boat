import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css"; // Import the default styles

function HeroImageSlider() {
  const slides = [
    {
      id: 1,
      img: "images/banners/1.webp",
    },
    {
      id: 2,
      img: "images/banners/2.webp",
    },
    {
      id: 3,
      img: "images/banners/3.webp",
    },
    {
      id: 4,
      img: "images/banners/4.webp",
    },
    {
      id: 5,
      img: "images/banners/5.webp",
    },
  ];

  const properties = {
    autoplay: true,
    duration: 3000,
    prevArrow: (
      <button className="hidden mx-2 font-bold text-gray-300 rounded-[50%] p-2 text-2xl lg:block">
        <GrPrevious />
      </button>
    ),
    nextArrow: (
      <button className="hidden  mx-2 font-bold text-gray-300 rounded-[50%] p-2 text-2xl lg:block">
        <GrNext />
      </button>
    ),
  };

  return (
    <Slide {...properties}>
      {slides.map((slide) => (
        <div
          key={slide.id}
          className=" w-full h-[34vh] sm:h-[60vh] md:h-[75vh] lg:h-[92vh] "
        >
          <div
            className=" h-full flex items-center justify-center bg-cover"
            style={{
              backgroundImage: `url(${slide.img})`,
            }}
          ></div>
        </div>
      ))}
    </Slide>
  );
}

export default HeroImageSlider;
