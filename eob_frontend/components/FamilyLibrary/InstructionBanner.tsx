import React from "react";
import logo_slogan from "@/public/assets/images/logo_slogan.png";
import Image from "next/image";

function InstructionBanner() {
  return (
    <div className="h-[238px] p-[24px] flex-1 flex border-[#dbe0de] border-[1px]">
      <div className="h-full">
        <Image src={logo_slogan} alt="logo_slogan" className="h-full w-auto" />
      </div>
      <div className="px-[15px] flex-1">
        <ul className=" list-disc list-inside">
          <li>
            EOB lưu trữ các family thiết kế của cá đơn vị VLXD uy tín và các
            chuyên gia BIM tool hàng đầu
          </li>
          <li>
            Hãy khám phá các family thiết kế và tải miễn phí, được lưu trữ trong
            cột thư mục bên cạnh
          </li>
        </ul>
        <div className="flex justify-center">
          <p>
            Xem hướng dẫn tại
            <a
              className="text-[#1b2c5a]"
              href="https://www.loom.com/share/e80df96312dd4ab2aa5f62af518dd44b"
            >
              &lt; Click here &gt;
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InstructionBanner;
