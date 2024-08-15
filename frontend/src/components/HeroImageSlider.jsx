import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css"; // Import the default styles

function HeroImageSlider() {
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

  const styles = {
    slideEffect: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "cover",
      height: "350px",
    },
  };

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
