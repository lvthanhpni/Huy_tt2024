"use client";
import React from "react";
import icon_mem from "../../public/assets/images/icon_mem.png";
import icon_building from "../../public/assets/images/icon_building.png";
import icon_laptop from "../../public/assets/images/icon_laptop.png";
import icon_document from "../../public/assets/images/icon_document.png";
import Image from "next/image";

const statisticData = [
  { icon: icon_mem, title: "Thành viên", value: "1348" },
  { icon: icon_building, title: "Đơn Vị VLXD", value: "3" },
  { icon: icon_laptop, title: "Family", value: "198" },
  { icon: icon_document, title: "Tài liệu", value: "198" },
];

function Statistic() {
  return (
    <div className="px-[48px] grid grid-cols-4 mb-[48px]">
      {statisticData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center pt-[48px] px-[15px]"
        >
          <Image
            className="h-[50px] w-auto object-contain"
            src={item.icon}
            alt="icon"
          />
          <div className="text-[0.9rem] text-[#1c2d5a] pt-1">{item.title}</div>
          <div className="font-bold text-[3.5rem] text-[#212f5a]">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Statistic;
