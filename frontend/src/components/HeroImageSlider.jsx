import React, { useState, useEffect } from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

function HeroImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // auto changing slide logic

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  const slides = [
    {
      id: 1,
      img: "https://res.cloudinary.com/dmrw4vltk/image/upload/v1717380132/e-commerce/banners/Shoe-Cover-1_krzv1j.jpg",
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/dmrw4vltk/image/upload/v1717380212/e-commerce/banners/Shoe-Cover-3_yhzwa1.jpg",
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/dmrw4vltk/image/upload/v1717380235/e-commerce/banners/Shoe-Cover-4_toowgg.jpg",
    },

    {
      id: 4,
      img: "https://res.cloudinary.com/dmrw4vltk/image/upload/v1717380292/e-commerce/banners/hero_banner_3_oiuh12.webp",
    },
    {
      id: 5,
      img: "https://res.cloudinary.com/dmrw4vltk/image/upload/v1717380329/e-commerce/banners/hero_banner_4_hd4afe.webp",
    },
  ];

  return (
    <div className="h-[30vh] md:h-[50vh] lg:h-[70vh] xl:h-[100vh] relative ">
      {/* prev and next buttons */}

      <div className="absolute  z-50 cursor-pointer text-white text-2xl top-[50%] left-3  md:left-7 transform translate-x-0 translate-y-[-50%]  ">
        <GrPrevious onClick={handlePrevious} size={30} />
      </div>
      <div className="absolute z-50 cursor-pointer text-white text-2xl top-[50%] right-3  md:right-7 transform translate-x-0 translate-y-[-50%]  ">
        <GrNext onClick={handleNext} size={30} />
      </div>

      {/* navigation dots */}
      <div className="absolute hidden md:flex gap-2 z-50 bottom-7 left-[46%]">
        {slides.map((slide, index) => (
          <div
            onClick={() => setCurrentIndex(index)}
            key={index}
            className={
              currentIndex === index
                ? "w-3 h-3 cursor-pointer bg-slate-400 rounded-full"
                : "w-3 h-3 cursor-pointer bg-white rounded-full"
            }
          ></div>
        ))}
      </div>

      <div
        className="w-full h-[30vh] md:h-[50vh] lg:h-[70vh] xl:h-[100vh] rounded[10px]  bg-center bg-cover   "
        style={{ backgroundImage: `url(${slides[currentIndex].img})` }}
      ></div>
    </div>
  );
}

export default HeroImageSlider;
