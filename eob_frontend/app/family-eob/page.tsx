"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FolderList from "@/components/FamilyLibrary/FolderList";
import { IFolderItems } from "@/utils/interfaces";
import { AddButtonIcon, SearchIcon } from "@/public/assets/svg";
import Image from "next/image";
import logo_slogan from "@/public/assets/images/logo_slogan.png";
import { checkAuthorization, refreshAccessToken } from "@/utils/authorization";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UploadModal from "@/components/FamilyLibrary/UploadModal";
import { Button, TextField } from "@mui/material";

function EOBLibrary() {
  const [folderListData, setFolderListData] = useState<IFolderItems[]>([
    {
      id: 0,
      name: "root",
      children: [],
      is_root: true,
      can_upload: false,
      owner: 1,
    },
  ]);
  const [isLastFolder, setIsLastFolder] = useState(false);
  const [folderName, setFolderName] = useState<string>("");
  const [chosenFolder, setChosenFolder] = useState<IFolderItems | null>(null);
  const [isUploadAvailable, setIsUploadAvailable] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [rootFolder, setRootFolder] = useState({
    id: 0,
    name: "root",
    children: [],
  });

  const fetchFolderData = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/folder"
      );
      setFolderListData(response.data);
      setRootFolder(
        response.data.reduce((min: number, item: IFolderItems) => {
          return item.id < min ? item.id : min;
        })
      );
    } catch {
      console.log("Error fetching folder data");
    }
  };

  const handleDeleteFolder = async () => {
    refreshAccessToken();
    console.log(chosenFolder);
    if (canDelete) {
      try {
        const response = await axios.delete(
          process.env.NEXT_PUBLIC_API_URL + `/folder/${chosenFolder?.id}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    setChosenFolder(null);
    setCanDelete(false);

    fetchFolderData();
  };

  const handleCreateFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/folder/",
        {
          name: folderName,
          parent: chosenFolder?.id,
          is_root: false,
          can_upload: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    fetchFolderData();
  };

  useEffect(() => {
    checkAuthorization().then((res) => {
      setIsAuthorized(res.isAuthorized);
    });
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
          <div>
            {isAuthorized && (
              <div className="flex flex-col gap-[10px] mb-[10px]">
                <TextField
                  variant="outlined"
                  size="small"
                  label="Tên thư mục"
                  onChange={(e) => setFolderName(e.target.value)}
                />

                <Button
                  onClick={handleCreateFolder}
                  disabled={!isUploadAvailable}
                  variant="contained"
                  sx={{
                    backgroundColor: isUploadAvailable ? "#1b2c5a" : "#f3f3f3",
                    color: isUploadAvailable ? "#ffffff" : "#b4b4b4",
                    px: 1,
                  }}
                >
                  Thêm thư mục mới
                </Button>

                <Button
                  onClick={handleDeleteFolder}
                  variant="contained"
                  disabled={!canDelete}
                  sx={{
                    backgroundColor: canDelete ? "#ff0000" : "#ffadad",
                    color: "#ffffff",
                    px: 1,
                  }}
                >
                  Xóa
                </Button>
              </div>
            )}
            <div className="w-[400px] p-[8px] border-[#dbe0de] border-[1px] h-fit">
              <FolderList
                data={folderListData}
                level={rootFolder.id}
                setIsUploadAvailable={setIsUploadAvailable}
                setIsLastFolder={setIsLastFolder}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
                setCanDelete={setCanDelete}
              />
            </div>
          </div>
          {isUploadAvailable ? (
            <div>
              <div>
                <div className="flex justify-between">
                  <p className="text-[20px] uppercase text-[#1b2c5a] font-bold">
                    Model mới &gt;
                  </p>
                  {isAuthorized && (
                    <button
                      onClick={() => setIsUploadModalOpen(true)}
                      className="text-white bg-red-700 w-[30px]"
                    >
                      <AddButtonIcon />
                    </button>
                  )}
                </div>
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
      <UploadModal
        isOpen={isUploadModalOpen}
        setIsOpen={setIsUploadModalOpen}
      />
    </div>
  );
}

export default EOBLibrary;
