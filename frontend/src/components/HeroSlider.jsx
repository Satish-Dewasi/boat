import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const HeroSlider = () => {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.pexels.com/photos/4103247/pexels-photo-4103247.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  ];

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
    prevArrow: <button className="hidden lg:block"> back</button>,
    nextArrow: <button className="hidden lg:block"> next </button>,
  };

  const indicators = (index) => (
    <div className="  w-10 h-10 bg-red-500 text-center mx-5 ">{index + 1}</div>
  );

  const responsiveSettings = [
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
    <Slide responsive={responsiveSettings} {...properties}>
      {images.map((image, index) => (
        <div key={index} className="each-slide-effect">
          <div
            style={{ ...styles.slideEffect, backgroundImage: `url(${image})` }}
          >
            <span style={styles.slideText}>{`Slide ${index + 1}`}</span>
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default HeroSlider;
