"use client";
import FolderList from "@/components/FamilyLibrary/FolderList";
import UploadModal from "@/components/FamilyLibrary/UploadModal";
import { SearchIcon } from "@/public/assets/svg";
import FileList from "@/components/FamilyLibrary/FileList";
import { checkAuthorization, refreshAccessToken } from "@/utils/authorization";
import { IFileItem, IFolderItems } from "@/utils/interfaces";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/compat/router";
import { useParams } from "next/navigation";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import InstructionBanner from "@/components/FamilyLibrary/InstructionBanner";

function LibraryEOBLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const param = useParams();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [folderName, setFolderName] = useState<string>("");
  const [chosenFolder, setChosenFolder] = useState<IFolderItems | null>(null);
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
  const [rootFolder, setRootFolder] = useState({
    id: 0,
    name: "root",
    children: [],
  });
  const [isUploadAvailable, setIsUploadAvailable] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [fileItems, setFileItems] = useState<IFileItem[] | []>([]);
  const [materialDetailId, setMaterialDetailId] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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

  const handleCreateFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      axios
        .post(
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
        )
        .then(() => {
          fetchFolderData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenameFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      axios
        .patch(
          process.env.NEXT_PUBLIC_API_URL + `/folder/${chosenFolder?.id}/`,
          {
            name: folderName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then(() => {
          fetchFolderData();
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteFolder = async () => {
    refreshAccessToken();
    if (canDelete) {
      try {
        await axios
          .delete(
            process.env.NEXT_PUBLIC_API_URL + `/folder/${chosenFolder?.id}/`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then(() => {
            fetchFolderData();
            setChosenFolder(null);
            setCanDelete(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    checkAuthorization().then((res) => {
      setIsAuthorized(res.isAuthorized);
    });
    fetchFolderData();
    console.log(param.folderid);
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
                  onClick={handleRenameFolder}
                  disabled={!canDelete}
                  variant="contained"
                  sx={{
                    backgroundColor: canDelete ? "#ebd13f" : "#f3f3f3",
                    color: canDelete ? "#ffffff" : "#b4b4b4",
                    px: 1,
                  }}
                >
                  Đổi tên thư mục
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
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
                setCanDelete={setCanDelete}
                setFileItems={setFileItems}
                setMaterialDetailId={setMaterialDetailId}
              />
            </div>
          </div>
          {param.fileid !== undefined && chosenFolder === null ? (
            children
          ) : isUploadAvailable ? (
            <FileList
              setChosenFolder={setChosenFolder}
              isAuthorized={isAuthorized}
              setIsUploadModalOpen={setIsUploadModalOpen}
              fileItems={fileItems}
              setMaterialDetailId={setMaterialDetailId}
            />
          ) : (
            <InstructionBanner />
          )}
        </div>
      </div>
      <UploadModal
        chosenFolder={chosenFolder}
        isOpen={isUploadModalOpen}
        setIsOpen={setIsUploadModalOpen}
      />
    </div>
  );
}

export default LibraryEOBLayout;
