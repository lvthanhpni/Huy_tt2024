"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import carousel1 from "../../public/assets/images/carousel-1.png";
import carousel2 from "../../public/assets/images/carousel-2.png";
import carousel3 from "../../public/assets/images/carousel-3.png";
import carousel1Text from "../../public/assets/images/carousel-1-text.png";
import carousel2Text from "../../public/assets/images/carousel-2-text.png";
import carousel3Text from "../../public/assets/images/carousel-3-text.png";

interface CarouselImage {
  image: StaticImageData;
  background: StaticImageData;
}

const bannerBackground: CarouselImage[] = [
  {
    image: carousel1Text,
    background: carousel1,
  },
  {
    image: carousel2Text,
    background: carousel2,
  },
  {
    image: carousel3Text,
    background: carousel3,
  },
];

function Banner() {
  const [carouselPage, setCarouselPage] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCarouselPage((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(intervalID);
  }, [carouselPage]);

  return (
    <div
      style={{
        background: `url(${bannerBackground[carouselPage].background.src}) no-repeat center center/cover`,
      }}
      className="h-[680px] flex items-center flex-col justify-between"
    >
      <div className="flex flex-col items-center">
        <Image
          className="max-w-[950px] max-h-[480px] object-contain"
          src={bannerBackground[carouselPage].image}
          alt="banner"
        />
        <button
          className={
            carouselPage != 1
              ? "hidden"
              : "text-white bg-[#1b2c5a] px-[15px] py-[5px] rounded-md"
          }
        >
          Đăng ký
        </button>
        <button
          className={
            carouselPage != 2
              ? "hidden"
              : "text-white bg-[#1b2c5a] px-[15px] py-[5px] rounded-md"
          }
        >
          VLXD Đăng ký
        </button>
      </div>
      <div className="flex">
        <div
          className={
            `w-[17px] h-[17px] mx-[3px] border-2 border-black rounded-full duration-500` +
            (carouselPage === 0 ? " bg-black" : "")
          }
        ></div>
        <div
          className={
            `w-[17px] h-[17px] mx-[3px] border-2 border-black rounded-full duration-500` +
            (carouselPage === 1 ? " bg-black" : "")
          }
        ></div>
        <div
          className={
            `w-[17px] h-[17px] mx-[3px] border-2 border-black rounded-full duration-500` +
            (carouselPage === 2 ? " bg-black" : "")
          }
        ></div>
      </div>
    </div>
  );
}

export default Banner;
