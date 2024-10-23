import { Swiper, SwiperSlide } from "swiper/react";
import AustraAluLogo from "../../public/assets/images/AustraAluLogo.png";
import DuluxLogo from "../../public/assets/images/DuluxLogo.png";
import PhuongNamLogo from "../../public/assets/images/PhuongNamLogo.png";

import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";

const sliderData = [
  { image: AustraAluLogo },
  { image: DuluxLogo },
  { image: PhuongNamLogo },
  { image: AustraAluLogo },
  { image: DuluxLogo },
  { image: PhuongNamLogo },
  { image: AustraAluLogo },
  { image: DuluxLogo },
  { image: PhuongNamLogo },
];

function SliderSection() {
  return (
    <div className="py-[48px] px-[111px] bg-[#f6f6f5] my-[48px]">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={6}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index} style={{ height: "100%" }}>
            <div className="h-[77px] flex items-center justify-center">
              <Image
                src={item.image}
                alt={item.image.src}
                className="w-[110px] h-auto object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SliderSection;
