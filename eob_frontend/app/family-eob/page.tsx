"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FolderList from "@/components/FamilyLibrary/FolderList";
import { IFolderItems } from "@/utils/interfaces";
import { SearchIcon } from "@/public/assets/svg";
import Image from "next/image";
import logo_slogan from "@/public/assets/images/logo_slogan.png";

function EOBLibrary() {
  const [folderListData, setFolderListData] = useState<IFolderItems[]>([
    { id: 0, name: "root", children: [] },
  ]);
  const [isLastFolder, setIsLastFolder] = useState(false);

  useEffect(() => {
    const fetchFolderData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/folder"
        );
        setFolderListData(response.data);
      } catch {
        console.log("Error fetching folder data");
      }
    };
    fetchFolderData();
  }, []);

  return (
    <div className="py-[12px] px-[30px] flex">
      <div className="w-full">
        <div className="text-[#1b2c5a] flex font-bold mb-[28px]">
          <a href="/">
            <p>Trang chủ</p>
          </a>
          <p>/</p>
          <a href="/family-eob">
            <p>Tất cả Family</p>
          </a>
        </div>
        <div className="uppercase font-bold text-[20px] mb-[24px]">
          <p>Tất cả Family</p>
        </div>
        <div className="h-[45px] overflow-hidden flex items-center max-w-[370px] mb-[16px] border-[#dbe0de] border-[3px] rounded-[40px]">
          <input
            placeholder="Tìm kiếm"
            type="text"
            className="w-full pl-[10px]"
          />
          <div className="w-[16px] h-[16px] mr-[15px]">
            <SearchIcon />
          </div>
        </div>
        <div className="flex gap-[32px] w-full">
          <div className="w-[740px] p-[8px] border-[#dbe0de] border-[1px] h-fit">
            <FolderList
              data={folderListData}
              level={1}
              setIsLastFolder={setIsLastFolder}
            />
          </div>
          {isLastFolder ? (
            <div>
              <div>
                <p className="text-[20px] uppercase text-[#1b2c5a] font-bold">
                  Model mới &gt;
                </p>
                <p className="">Các model mới cập nhật gần đây nhất</p>
                <div></div>
                <div></div>
              </div>
              <div>
                <p className="text-[20px] uppercase text-[#1b2c5a] font-bold">
                  Model theo nhà cung cấp
                </p>
                <p>Các model phân loại theo nhà cung cấp</p>
              </div>
              <div>
                <p className="text-[20px] uppercase text-[#1b2c5a] font-bold">
                  Model theo phần mềm
                </p>
                <p>Các model phân loại theo phần mềm thiết kế</p>
              </div>
            </div>
          ) : (
            <div className="h-[238px] p-[24px] flex-1 flex border-[#dbe0de] border-[1px]">
              <div className="h-full">
                <Image
                  src={logo_slogan}
                  alt="logo_slogan"
                  className="h-full w-auto"
                />
              </div>
              <div className="px-[15px] flex-1">
                <ul className=" list-disc list-inside">
                  <li>
                    EOB lưu trữ các family thiết kế của cá đơn vị VLXD uy tín và
                    các chuyên gia BIM tool hàng đầu
                  </li>
                  <li>
                    Hãy khám phá các family thiết kế và tải miễn phí, được lưu
                    trữ trong cột thư mục bên cạnh
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
          )}
        </div>
      </div>
    </div>
  );
}

export default EOBLibrary;
